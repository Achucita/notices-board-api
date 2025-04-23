const db = require('../models');
const Notice = db.notices;

// CREATE: Crear un nuevo aviso
exports.create = async (ctx) => {
  if (!ctx.request.body.title || !ctx.request.body.content || !ctx.request.body.category) {
    ctx.status = 400;
    ctx.body = { message: "Title, content y category son campos requeridos." };
    return;
  }

  try {
    const notice = await Notice.create({
      title: ctx.request.body.title,
      content: ctx.request.body.content,
      category: ctx.request.body.category,
      priority: ctx.request.body.priority || 1,
      isActive: ctx.request.body.isActive !== false // Default: true
    });
    
    ctx.status = 201;
    ctx.body = notice;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { 
      message: err.message || "Error al crear el aviso.",
      details: err.errors?.map(e => e.message) // Detalles de validación de Sequelize
    };
  }
};

// READ: Obtener todos los avisos (con filtro opcional por categoría)
exports.findAll = async (ctx) => {
  try {
    const whereCondition = {};
    
    // Filtro por categoría si se proporciona ?category=XYZ
    if (ctx.query.category) {
      whereCondition.category = ctx.query.category;
    }
    
    // Filtro por estado activo/inactivo
    if (ctx.query.isActive !== undefined) {
      whereCondition.isActive = ctx.query.isActive === 'true';
    }

    const notices = await Notice.findAll({ 
      where: whereCondition,
      order: [['priority', 'DESC']] // Ordenar por prioridad (mayor primero)
    });
    
    ctx.body = notices;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { message: "Error al recuperar los avisos." };
  }
};

// READ: Obtener un aviso por ID
exports.findOne = async (ctx) => {
  const id = ctx.params.id;
  
  try {
    const notice = await Notice.findByPk(id);
    
    if (!notice) {
      ctx.status = 404;
      ctx.body = { message: `Aviso con id=${id} no encontrado.` };
      return;
    }
    
    ctx.body = notice;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { message: `Error al recuperar aviso con id=${id}.` };
  }
};

// UPDATE: Actualizar un aviso por ID
exports.update = async (ctx) => {
  const id = ctx.params.id;
  
  try {
    const [numUpdated] = await Notice.update(ctx.request.body, {
      where: { id: id }
    });
    
    if (numUpdated === 0) {
      ctx.status = 404;
      ctx.body = { message: `No se encontró aviso con id=${id} para actualizar.` };
      return;
    }
    
    // Devuelve el aviso actualizado
    const updatedNotice = await Notice.findByPk(id);
    ctx.body = {
      message: "Aviso actualizado exitosamente.",
      data: updatedNotice
    };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { 
      message: `Error al actualizar aviso con id=${id}.`,
      details: err.errors?.map(e => e.message)
    };
  }
};

// DELETE: Eliminar un aviso por ID (borrado lógico)
exports.delete = async (ctx) => {
  const id = ctx.params.id;
  
  try {
    // Opción 1: Borrado físico (elimina de la BD)
    // const numDeleted = await Notice.destroy({ where: { id: id });
    
    // Opción 2: Borrado lógico (recomendado)
    const [numUpdated] = await Notice.update(
      { isActive: false },
      { where: { id: id } }
    );
    
    if (numUpdated === 0) {
      ctx.status = 404;
      ctx.body = { message: `No se encontró aviso con id=${id} para desactivar.` };
      return;
    }
    
    ctx.body = { message: "Aviso desactivado exitosamente." };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { message: `Error al desactivar aviso con id=${id}.` };
  }
};

// DELETE/ALTERNATIVE: Eliminación física (si se prefiere)
exports.hardDelete = async (ctx) => {
  const id = ctx.params.id;
  
  try {
    const numDeleted = await Notice.destroy({ where: { id: id } });
    
    if (numDeleted === 0) {
      ctx.status = 404;
      ctx.body = { message: `No se encontró aviso con id=${id} para eliminar.` };
      return;
    }
    
    ctx.body = { message: "Aviso eliminado permanentemente." };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { message: `Error al eliminar aviso con id=${id}.` };
  }
};
