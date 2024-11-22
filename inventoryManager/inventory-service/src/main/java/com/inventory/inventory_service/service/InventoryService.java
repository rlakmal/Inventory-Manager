package com.inventory.inventory_service.service;

import com.inventory.inventory_service.dto.InventoryDTO;
import com.inventory.inventory_service.util.StandardResponse;

import java.util.List;

public interface InventoryService {
    StandardResponse addItem(InventoryDTO inventoryDTO);

    StandardResponse updateItem(int inventoryId, InventoryDTO inventoryDTO);

    StandardResponse deleteInventory(int inventoryId);

    StandardResponse getItems(int page, int size);

//    StandardResponse searchInventory(String itemName, String itemType, List<String> brands);

    StandardResponse searchInventory(int page, int size, String itemName, String itemType, List<String> brands);
}
