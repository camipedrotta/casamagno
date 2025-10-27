// promociones.js (JavaScript separado del HTML, Requerimiento 5c)

// Precios de los productos que se usarán en la calculadora
const PRODUCT_PRICES = {
    ramos: 30000,
    macetas: 20000,
    velas: 22000,
    // (Se omiten los demás productos para simplificar el ejemplo de la calculadora)
};

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
    
    // Total sin descuento (Requerimiento 3bi)
    let subtotal = subtotalRamos + subtotalMacetas + subtotalVelas; 
    let discountAmount = 0; // Descuento aplicado (Requerimiento 3bii)
    let finalTotal = subtotal; // Total final con ahorro (Requerimiento 3biii)
    let savingMessageText = "";

    // 3. Aplicar Promociones
    
    // a. 2x1 en Ramos de Flores (mama.jpg)
    if (selectedPromo === '2x1Ramos' && ramosQty >= 2) {
        // La promoción es "Llevas 2, pagas 1". Se calcula cuántos ramos se pagan.
        const paidRamos = ramosQty - Math.floor(ramosQty / 2);
        const originalRamosCost = ramosQty * PRODUCT_PRICES.ramos;
        const discountedRamosCost = paidRamos * PRODUCT_PRICES.ramos;
        
        // Calcular el ahorro por esta promoción
        const ahorroRamos = originalRamosCost - discountedRamosCost;
        
        // Actualizar el subtotal SÓLO para el cálculo de descuento. El subtotal general ya está calculado arriba.
        discountAmount += ahorroRamos;
        savingMessageText = `¡Aplicaste 2x1 en Ramos! Te ahorraste $${ahorroRamos.toLocaleString('es-CL')}.`;
    }

    // b. 10% OFF en primera compra (desc.jpg)
    if (selectedPromo === 'newCustomer') {
        const discount = subtotal * 0.10;
        discountAmount += discount;
        savingMessageText = `¡Bienvenido/a! Aplicaste un 10% OFF en tu primera compra.`;
    }
    
    // c. 15% OFF en compras mayores a $50.000 (off.jpg)
    // NOTA: Se aplica SOLO si el subtotal es mayor a $50.000 y si no se aplicó la promoción "newCustomer" (para evitar dobles descuentos complejos)
    if (selectedPromo === 'bulkDiscount' && subtotal > 50000) {
        const discount = subtotal * 0.15;
        discountAmount += discount;
        savingMessageText = `¡Excelente! Por superar los $50.000, aplicaste un 15% OFF.`;
    } else if (selectedPromo === 'bulkDiscount' && subtotal <= 50000) {
        savingMessageText = "El total debe ser superior a $50.000 para aplicar el 15% OFF.";
        discountAmount = 0; // Se asegura de que no haya descuento
    }


    // 4. Calcular Total Final y Formatear
    finalTotal = subtotal - discountAmount;
    
    // Formatear los valores para la vista (moneda chilena/español)
    const format = (value) => `$${Math.round(value).toLocaleString('es-CL')}`;

    // 5. Mostrar Resultados (Requerimiento 3d)
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