// promociones.js

// Precios de los productos que se usarán en la calculadora
const PRODUCT_PRICES = {
    ramos: 30000,
    macetas: 20000,
    velas: 22000,
};

/**
 * Calcula el total de la compra aplicando el descuento seleccionado.
 */
function calculateTotal() {
    // 1. Obtener cantidades y promoción seleccionada
    const ramosQty = parseInt(document.getElementById('ramosQty').value) || 0;
    const macetasQty = parseInt(document.getElementById('macetasQty').value) || 0;
    const velasQty = parseInt(document.getElementById('velasQty').value) || 0;
    const selectedPromo = document.getElementById('promoSelect').value;

    // 2. Calcular el Subtotal (Total sin Descuento)
    const subtotalRamos = ramosQty * PRODUCT_PRICES.ramos;
    const subtotalMacetas = macetasQty * PRODUCT_PRICES.macetas;
    const subtotalVelas = velasQty * PRODUCT_PRICES.velas;
    
    let subtotal = subtotalRamos + subtotalMacetas + subtotalVelas; 
    let discountAmount = 0; 
    let finalTotal = subtotal; 
    let savingMessageText = "";

    // 3. Aplicar Promociones
    
    // a. 2x1 en Ramos de Flores (mama.jpg)
    if (selectedPromo === '2x1Ramos' && ramosQty >= 2) {
        // Se calcula cuántos ramos se pagan (la mitad se descuenta)
        const paidRamos = ramosQty - Math.floor(ramosQty / 2);
        const originalRamosCost = ramosQty * PRODUCT_PRICES.ramos;
        const discountedRamosCost = paidRamos * PRODUCT_PRICES.ramos;
        
        // Calcular el ahorro y el total final
        discountAmount = originalRamosCost - discountedRamosCost;
        finalTotal = subtotal - discountAmount;
        
        savingMessageText = `¡Aplicaste 2x1 en Ramos! Te ahorraste el costo de ${Math.floor(ramosQty / 2)} ramo(s).`;
    }

    // b. 10% OFF en primera compra (desc.jpg)
    else if (selectedPromo === 'newCustomer') {
        const discount = subtotal * 0.10;
        discountAmount = discount;
        finalTotal = subtotal - discountAmount;
        savingMessageText = `¡Bienvenido/a! Aplicaste un 10% OFF en tu primera compra.`;
    }
    
    // c. 15% OFF en compras mayores a $50.000 (off.jpg)
    else if (selectedPromo === 'bulkDiscount') {
        if (subtotal > 50000) {
            const discount = subtotal * 0.15;
            discountAmount = discount;
            finalTotal = subtotal - discountAmount;
            savingMessageText = `¡Excelente! Por superar los $50.000, aplicaste un 15% OFF.`;
        } else {
            // Si selecciona la promoción, pero no cumple la condición
            savingMessageText = "El total debe ser superior a $50.000 para aplicar el 15% OFF. No se aplicó descuento.";
            discountAmount = 0; 
            finalTotal = subtotal;
        }
    }


    // 4. Formatear y Mostrar Resultados
    
    // Función de formato para moneda (pesos chilenos/español)
    const format = (value) => `$${Math.round(value).toLocaleString('es-CL')}`;

    document.getElementById('subtotalValue').textContent = format(subtotal);
    document.getElementById('discountValue').textContent = format(discountAmount);
    document.getElementById('finalTotalValue').textContent = format(finalTotal);
    
    // Mensaje de ahorro
    if (discountAmount > 0) {
        document.getElementById('savingMessage').textContent = `En esta compra estás ahorrando un total de ${format(discountAmount)}.`;
    } else {
        document.getElementById('savingMessage').textContent = savingMessageText || "No se ha aplicado ningún descuento en esta compra.";
    }

    // Mostrar el bloque de resultados
    document.getElementById('results').style.display = 'block';
}