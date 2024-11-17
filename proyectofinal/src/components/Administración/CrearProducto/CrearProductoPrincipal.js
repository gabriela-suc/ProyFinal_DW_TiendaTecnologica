import React, { useState } from 'react';
import './CrearProducto.css';
import axios from 'axios'; // Importa axios

function CrearProducto() {
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [marca, setMarca] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad_stock, setCantidadStock] = useState('');
  const [imagenes, setImagenes] = useState(['', '', '']); // Arreglo para las imágenes
  const [especificaciones, setEspecificaciones] = useState({
    pantalla: '',
    procesador: '',
    ram: '',
    almacenamiento: ''
  });
  const [especificacionesAdicionales, setEspecificacionesAdicionales] = useState([]);

  // Manejar el cambio en las imágenes
  const handleImageChange = (e) => {
    const index = parseInt(e.target.name.split('imagen')[1]) - 1; // Para identificar la imagen (imagen1, imagen2, imagen3)
    const newImagenes = [...imagenes];
    newImagenes[index] = e.target.value;
    setImagenes(newImagenes);
  };

  // Manejar el cambio en las especificaciones
  const handleSpecificationChange = (e) => {
    setEspecificaciones({
      ...especificaciones,
      [e.target.name]: e.target.value,
    });
  };

  // Agregar nueva especificación adicional
  const handleAddSpec = () => {
    setEspecificacionesAdicionales([...especificacionesAdicionales, { key: '', value: '' }]);
  };

  // Manejar el cambio en especificaciones adicionales
  const handleAdditionalSpecChange = (index, e) => {
    const updatedSpecs = [...especificacionesAdicionales];
    updatedSpecs[index][e.target.name] = e.target.value;
    setEspecificacionesAdicionales(updatedSpecs);
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const precioNumerico = parseFloat(precio);
    const cantidadStockNumerico = parseInt(cantidad_stock);

    // Validar que el precio sea un número
    if (isNaN(precioNumerico) || precioNumerico < 0) {
      alert('Por favor, introduce un precio válido.');
      return;
    }

    // Validar que el stock sea un número
    if (isNaN(cantidadStockNumerico) || cantidadStockNumerico < 0) {
      alert('Por favor, introduce una cantidad de stock válida.');
      return;
    }

    const productoData = {
      nombre,
      descripcion,
      categoria,
      marca,
      precio: precioNumerico,
      cantidad_stock: cantidadStockNumerico,
      imagenes: imagenes.filter(imagen => imagen), // Filtra las imágenes vacías
      especificaciones,
      especificacionesAdicionales
    };

    console.log('Datos enviados al backend:', productoData);

    try {
      const response = await axios.post('http://localhost:3001/api/productos', productoData);

      if (response.status === 201) {
        alert('Producto creado exitosamente');
        // Puedes redirigir o limpiar los campos después de la creación
        setNombre('');
        setDescripcion('');
        setCategoria('');
        setMarca('');
        setPrecio('');
        setCantidadStock('');
        setImagenes(['', '', '']);
        setEspecificaciones({ pantalla: '', procesador: '', ram: '', almacenamiento: '' });
        setEspecificacionesAdicionales([]);
      }
    } catch (error) {
      console.error('Error al crear el producto:', error.response ? error.response.data : error);
      alert('Hubo un error al crear el producto');
    }
  };

  return (
    <div className="container">
      <h2>Crear Producto</h2>
      <form onSubmit={handleSubmit}>
        {/* Campos básicos */}
        <div>
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>

        <div>
          <label>Descripción:</label>
          <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
        </div>

        <div>
          <label>Categoría:</label>
          <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} required />
        </div>

        <div>
          <label>Marca:</label>
          <input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} required />
        </div>

        <div>
          <label>Precio:</label>
          <input
            type="text"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
            placeholder="puede ser decimal"
          />
        </div>

        <div>
          <label>Cantidad en Stock:</label>
          <input
            type="number"
            value={cantidad_stock}
            onChange={(e) => setCantidadStock(e.target.value)}
            required
          />
        </div>

        {/* Imágenes */}
        <div>
          <label>Imágenes (URLs):</label>
          <input type="text" name="imagen1" placeholder="Imagen 1" value={imagenes[0]} onChange={handleImageChange} required />
          <input type="text" name="imagen2" placeholder="Imagen 2" value={imagenes[1]} onChange={handleImageChange} required />
          <input type="text" name="imagen3" placeholder="Imagen 3" value={imagenes[2]} onChange={handleImageChange} required />
        </div>

        {/* Especificaciones */}
        <h4>Especificaciones</h4>
        <div>
          <label>Pantalla:</label>
          <input type="text" name="pantalla" value={especificaciones.pantalla} onChange={handleSpecificationChange} />
        </div>

        <div>
          <label>Procesador:</label>
          <input type="text" name="procesador" value={especificaciones.procesador} onChange={handleSpecificationChange} />
        </div>

        <div>
          <label>RAM:</label>
          <input type="text" name="ram" value={especificaciones.ram} onChange={handleSpecificationChange} />
        </div>

        <div>
          <label>Almacenamiento:</label>
          <input type="text" name="almacenamiento" value={especificaciones.almacenamiento} onChange={handleSpecificationChange} />
        </div>

        {/* Especificaciones adicionales */}
        <h4>Especificaciones Adicionales</h4>
        {especificacionesAdicionales.map((spec, index) => (
          <div key={index}>
            <input type="text" name="key" placeholder="Nombre de la especificación" value={spec.key} onChange={(e) => handleAdditionalSpecChange(index, e)} />
            <input type="text" name="value" placeholder="Valor" value={spec.value} onChange={(e) => handleAdditionalSpecChange(index, e)} />
          </div>
        ))}

        <button type="button" onClick={handleAddSpec}>Agregar Nueva Especificación</button>

        {/* Botón de Enviar */}
        <button type="submit">Crear Producto</button>
      </form>
    </div>
  );
}

export default CrearProducto;
