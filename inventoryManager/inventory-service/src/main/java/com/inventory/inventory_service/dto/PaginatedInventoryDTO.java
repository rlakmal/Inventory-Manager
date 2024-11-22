package com.inventory.inventory_service.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PaginatedInventoryDTO {
    private List<InventoryDTO> inventoryDTOS;
    private long dataCount;
}
