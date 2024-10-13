import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    // Check if required fields are filled
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill all fields!" };
    }

    try {
      // Make POST request to the API
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      // Handle errors from the API
      if (!res.ok) {
        const errorData = await res.json();
        return { success: false, message: errorData.message || "Error creating product" };
      }

      const data = await res.json();

      // Update the products list in the store
      set((state) => ({ products: [...state.products, data.data] }));

      return { success: true, message: "Product created successfully!" };
      
    } catch (error) {
      // Catch any network or server errors
      return { success: false, message: "An error occurred while creating the product." };
    }
  },
}));
