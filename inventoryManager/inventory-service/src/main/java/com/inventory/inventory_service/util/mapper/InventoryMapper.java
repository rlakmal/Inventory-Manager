package com.inventory.inventory_service.util.mapper;
import com.inventory.inventory_service.dto.InventoryDTO;
import com.inventory.inventory_service.entity.InventoryEntity;
import org.mapstruct.Mapper;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(componentModel="spring")
public interface InventoryMapper {
    InventoryEntity inventoryDtoToEntity(InventoryDTO inventoryDTO);

    List<InventoryDTO> InventoryEntityToDtoList(List<InventoryEntity> inventoryEntities);

    List<InventoryDTO> pageTOList(Page<InventoryEntity> inventoryEntityPage);

    List<InventoryDTO> InventoryEntityListToDTO(List<InventoryEntity> inventoryEntities);

    List<InventoryDTO> InventoryPageEntityListToDTO(Page<InventoryEntity> inventoryEntityPage);
}
