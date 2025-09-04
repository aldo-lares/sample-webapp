import { Product, ProductFormData } from '../types/Product';

const STORAGE_KEY = 'sample-webapp-products';

export class ProductService {
  static saveProduct(formData: ProductFormData): Product {
    const products = this.getProducts();
    
    // Check for duplicate names
    const existingProduct = products.find(
      p => p.name.toLowerCase() === formData.name.toLowerCase()
    );
    
    if (existingProduct) {
      throw new Error(`Ya existe un producto con el nombre "${formData.name}"`);
    }

    const newProduct: Product = {
      id: this.generateId(),
      name: formData.name.trim(),
      description: formData.description.trim(),
      unitPrice: parseFloat(formData.unitPrice),
      quantity: parseInt(formData.quantity, 10),
      category: formData.category?.trim() || undefined,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    products.push(newProduct);
    this.saveProducts(products);
    
    return newProduct;
  }

  static getProducts(): Product[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      
      const products = JSON.parse(stored);
      // Convert date strings back to Date objects
      return products.map((p: any) => ({
        ...p,
        createdAt: new Date(p.createdAt),
        updatedAt: new Date(p.updatedAt)
      }));
    } catch (error) {
      console.error('Error loading products:', error);
      return [];
    }
  }

  static saveProducts(products: Product[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (error) {
      console.error('Error saving products:', error);
      throw new Error('Error al guardar el producto');
    }
  }

  private static generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}