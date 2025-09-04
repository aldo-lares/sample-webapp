import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';

interface ProductFormData {
  name: string;
  description: string;
  unitPrice: string;
  quantity: string;
  category: string;
}

interface ProductRegistrationProps {
  onProductSaved?: () => void;
}

export const ProductRegistration: React.FC<ProductRegistrationProps> = ({ onProductSaved }) => {
  const { products, addProduct } = useProducts();
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    unitPrice: '',
    quantity: '',
    category: ''
  });
  
  const [errors, setErrors] = useState<Partial<ProductFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: Partial<ProductFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    } else if (products.some(p => p.name.toLowerCase() === formData.name.toLowerCase())) {
      newErrors.name = `Ya existe un producto con el nombre "${formData.name}"`;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
    }

    if (!formData.unitPrice.trim()) {
      newErrors.unitPrice = 'El precio unitario es obligatorio';
    } else {
      const price = parseFloat(formData.unitPrice);
      if (isNaN(price) || price <= 0) {
        newErrors.unitPrice = 'El precio debe ser un número mayor a 0';
      }
    }

    if (!formData.quantity.trim()) {
      newErrors.quantity = 'La cantidad inicial es obligatoria';
    } else {
      const quantity = parseInt(formData.quantity, 10);
      if (isNaN(quantity) || quantity < 0) {
        newErrors.quantity = 'La cantidad debe ser un número mayor o igual a 0';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const productData = {
        name: formData.name.trim(),
        quantity: parseInt(formData.quantity, 10),
        category: formData.category.trim() || 'Sin categoría',
        price: parseFloat(formData.unitPrice),
      };

      addProduct(productData);
      setSuccessMessage(`Producto "${productData.name}" registrado exitosamente`);
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        unitPrice: '',
        quantity: '',
        category: ''
      });
      setErrors({});
      
      onProductSaved?.();
    } catch (error) {
      setErrors({ name: error instanceof Error ? error.message : 'Error al guardar el producto' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ProductFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  return (
    <div className="product-registration-container">
      <div className="product-registration-card">
        <h1>Registrar Nuevo Producto</h1>
        
        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-field">
            <label htmlFor="name">Nombre del Producto *</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange('name')}
              className={errors.name ? 'error' : ''}
              placeholder="Ingrese el nombre del producto"
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="description">Descripción *</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleInputChange('description')}
              className={errors.description ? 'error' : ''}
              placeholder="Ingrese la descripción del producto"
              rows={3}
            />
            {errors.description && <span className="error-text">{errors.description}</span>}
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="unitPrice">Precio Unitario *</label>
              <input
                type="number"
                id="unitPrice"
                value={formData.unitPrice}
                onChange={handleInputChange('unitPrice')}
                className={errors.unitPrice ? 'error' : ''}
                placeholder="0.00"
                step="0.01"
                min="0"
              />
              {errors.unitPrice && <span className="error-text">{errors.unitPrice}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="quantity">Cantidad Inicial *</label>
              <input
                type="number"
                id="quantity"
                value={formData.quantity}
                onChange={handleInputChange('quantity')}
                className={errors.quantity ? 'error' : ''}
                placeholder="0"
                min="0"
              />
              {errors.quantity && <span className="error-text">{errors.quantity}</span>}
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="category">Categoría</label>
            <input
              type="text"
              id="category"
              value={formData.category}
              onChange={handleInputChange('category')}
              placeholder="Ingrese la categoría (opcional)"
            />
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="save-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Guardando...' : 'Guardar Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};