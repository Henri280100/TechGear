

export const ProductManagement = () => {
    return (
        <div id="webcrumbs">
            <div className="w-full max-w-[1200px] p-3 sm:p-4 md:p-6 bg-gray-50 rounded-xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 md:mb-6">
                    <h1 className="text-xl sm:text-2xl font-bold">Product Management</h1>
                    <button className="bg-primary-600 hover:bg-primary-700 text-white px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 w-full md:w-auto justify-center md:justify-start transform hover:scale-[1.02]">
                        <span className="material-symbols-outlined">add</span>
                        Add New Product
                    </button>
                    {/* Next: "Add export/import buttons" */}
                </div>

                <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 mb-4 md:mb-6">
                    <div className="flex flex-col gap-4 items-start md:items-center justify-between mb-4">
                        <div className="relative w-full">
                            <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">
                                search
                            </span>
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-300"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 w-full">
                            <details className="relative">
                                <summary className="list-none cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-300">
                                    <span className="material-symbols-outlined">filter_alt</span>
                                    Filter
                                    <span className="material-symbols-outlined text-sm">expand_more</span>
                                </summary>
                                <div className="absolute right-0 md:right-auto mt-2 w-full sm:w-64 bg-white rounded-lg shadow-lg z-10 p-3 sm:p-4 border border-gray-200">
                                    <h3 className="font-medium mb-3">Filter Products</h3>
                                    <div className="mb-3">
                                        <label className="block text-sm mb-1">Category</label>
                                        <select className="w-full rounded-lg border border-gray-300 p-2">
                                            <option>All Categories</option>
                                            <option>Electronics</option>
                                            <option>Clothing</option>
                                            <option>Home & Garden</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="block text-sm mb-1">Status</label>
                                        <select className="w-full rounded-lg border border-gray-300 p-2">
                                            <option>Any Status</option>
                                            <option>In Stock</option>
                                            <option>Out of Stock</option>
                                            <option>Limited</option>
                                        </select>
                                    </div>
                                    <div className="flex justify-end gap-2 mt-4">
                                        <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all duration-300">
                                            Clear
                                        </button>
                                        <button className="px-3 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-300">
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            </details>

                            <details className="relative">
                                <summary className="list-none cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-300">
                                    <span className="material-symbols-outlined">sort</span>
                                    Sort
                                    <span className="material-symbols-outlined text-sm">expand_more</span>
                                </summary>
                                <div className="absolute right-0 md:right-auto mt-2 w-full sm:w-48 bg-white rounded-lg shadow-lg z-10 p-2 border border-gray-200">
                                    <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md transition-all duration-300 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm">arrow_upward</span>Name
                                        (A-Z)
                                    </button>
                                    <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md transition-all duration-300 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm">arrow_downward</span>Name
                                        (Z-A)
                                    </button>
                                    <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md transition-all duration-300 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm">arrow_upward</span>Price
                                        (Low-High)
                                    </button>
                                    <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md transition-all duration-300 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm">arrow_downward</span>Price
                                        (High-Low)
                                    </button>
                                </div>
                            </details>
                        </div>
                    </div>
                    {/* Next: "Add advanced filtering options" */}
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        <table className="w-full min-w-[650px] md:min-w-[800px]">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-1 sm:px-2 md:px-4 py-2 md:py-3 text-left">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 mr-3"
                                            />
                                            <span>Product</span>
                                        </div>
                                    </th>
                                    <th className="px-1 sm:px-2 md:px-4 py-2 md:py-3 text-left">Category</th>
                                    <th className="px-1 sm:px-2 md:px-4 py-2 md:py-3 text-left">Status</th>
                                    <th className="px-1 sm:px-2 md:px-4 py-2 md:py-3 text-right">Price</th>
                                    <th className="px-1 sm:px-2 md:px-4 py-2 md:py-3 text-right">Stock</th>
                                    <th className="px-1 sm:px-2 md:px-4 py-2 md:py-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {[
                                    {
                                        id: 1,
                                        name: "Premium Wireless Headphones",
                                        sku: "HDX-100",
                                        category: "Electronics",
                                        status: "In Stock",
                                        price: 149.99,
                                        stock: 78,
                                        image: "headphones.jpg"
                                    },
                                    {
                                        id: 2,
                                        name: 'Ultra HD Smart TV 55"',
                                        sku: "TV-55UHD",
                                        category: "Electronics",
                                        status: "Limited",
                                        price: 699.99,
                                        stock: 12,
                                        image: "tv.jpg"
                                    },
                                    {
                                        id: 3,
                                        name: "Cotton Casual T-Shirt",
                                        sku: "TS-BLK-M",
                                        category: "Clothing",
                                        status: "In Stock",
                                        price: 24.99,
                                        stock: 156,
                                        image: "tshirt.jpg"
                                    },
                                    {
                                        id: 4,
                                        name: "Stainless Steel Coffee Maker",
                                        sku: "CM-SS-01",
                                        category: "Home & Garden",
                                        status: "Out of Stock",
                                        price: 79.99,
                                        stock: 0,
                                        image: "coffee-maker.jpg"
                                    },
                                    {
                                        id: 5,
                                        name: "Fitness Smartwatch",
                                        sku: "SW-FIT-02",
                                        category: "Electronics",
                                        status: "In Stock",
                                        price: 129.99,
                                        stock: 42,
                                        image: "smartwatch.jpg"
                                    }
                                ].map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50 transition-colors duration-150">
                                        <td className="px-1 sm:px-2 md:px-4 py-2 md:py-3">
                                            <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                                                <input
                                                    type="checkbox"
                                                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                                />
                                                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-md bg-gray-200 overflow-hidden flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-gray-400">
                                                        image
                                                    </span>
                                                    {/* Next: "Replace with actual product image" */}
                                                </div>
                                                <div className="flex flex-col truncate">
                                                    <span className="font-medium truncate">{product.name}</span>
                                                    <span className="text-sm text-gray-500">SKU: {product.sku}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-1 sm:px-2 md:px-4 py-2 md:py-3">
                                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-1 sm:px-2 md:px-4 py-2 md:py-3">
                                            <span
                                                className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                                    product.status === "In Stock"
                                                        ? "bg-green-100 text-green-800"
                                                        : product.status === "Limited"
                                                          ? "bg-yellow-100 text-yellow-800"
                                                          : "bg-red-100 text-red-800"
                                                }`}
                                            >
                                                {product.status}
                                            </span>
                                        </td>
                                        <td className="px-1 sm:px-2 md:px-4 py-2 md:py-3 text-right font-medium">
                                            ${product.price.toFixed(2)}
                                        </td>
                                        <td className="px-1 sm:px-2 md:px-4 py-2 md:py-3 text-right">
                                            {product.stock}
                                        </td>
                                        <td className="px-1 sm:px-2 md:px-4 py-2 md:py-3">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    className="p-1.5 rounded-lg hover:bg-gray-100 transition-all duration-300"
                                                    title="Edit"
                                                >
                                                    <span className="material-symbols-outlined text-gray-600">
                                                        edit
                                                    </span>
                                                </button>
                                                <button
                                                    className="p-1.5 rounded-lg hover:bg-gray-100 transition-all duration-300"
                                                    title="Duplicate"
                                                >
                                                    <span className="material-symbols-outlined text-gray-600">
                                                        content_copy
                                                    </span>
                                                </button>
                                                <button
                                                    className="p-1.5 rounded-lg hover:bg-red-100 hover:text-red-600 transition-all duration-300"
                                                    title="Delete"
                                                >
                                                    <span className="material-symbols-outlined text-gray-600">
                                                        delete
                                                    </span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-200 gap-3 sm:gap-4">
                        <div className="flex items-center text-sm mb-3 sm:mb-0">
                            <span className="text-gray-700">
                                Showing <span className="font-medium">1</span> to <span className="font-medium">5</span>{" "}
                                of <span className="font-medium">24</span> products
                            </span>
                        </div>

                        <div className="flex flex-wrap justify-center gap-1 w-full sm:w-auto">
                            <button
                                className="px-2 sm:px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors duration-300 flex items-center gap-1 text-sm"
                                disabled
                            >
                                <span className="material-symbols-outlined text-sm">chevron_left</span>
                                Prev
                            </button>
                            <button className="w-9 h-9 rounded-md bg-primary-600 text-white flex items-center justify-center">
                                1
                            </button>
                            <button className="w-9 h-9 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors duration-300">
                                2
                            </button>
                            <button className="w-9 h-9 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors duration-300">
                                3
                            </button>
                            <button className="w-9 h-9 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors duration-300">
                                ...
                            </button>
                            <button className="w-9 h-9 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors duration-300">
                                5
                            </button>
                            <button className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors duration-300 flex items-center gap-1 ml-auto sm:ml-0">
                                Next
                                <span className="material-symbols-outlined text-sm">chevron_right</span>
                            </button>
                        </div>
                        {/* Next: "Add items per page selector" */}
                    </div>
                </div>
            </div>
        </div>
    )
}
