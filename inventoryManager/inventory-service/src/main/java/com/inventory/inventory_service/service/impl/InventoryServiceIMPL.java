package com.inventory.inventory_service.service.impl;
import com.inventory.inventory_service.dto.InventoryDTO;
import com.inventory.inventory_service.dto.PaginatedInventoryDTO;
import com.inventory.inventory_service.entity.InventoryEntity;
import com.inventory.inventory_service.exception.NotFoundException;
import com.inventory.inventory_service.repo.InventoryRepo;
import com.inventory.inventory_service.service.InventoryService;
import com.inventory.inventory_service.util.StandardResponse;
import com.inventory.inventory_service.util.mapper.InventoryMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class InventoryServiceIMPL implements InventoryService {
    @Autowired
    private InventoryRepo inventoryRepo;

    @Autowired
    private InventoryMapper inventoryMapper;


    @Override
    public StandardResponse addItem(InventoryDTO inventoryDTO) {
        System.out.println(inventoryDTO);
        InventoryEntity inventory = inventoryMapper.inventoryDtoToEntity(inventoryDTO);
        System.out.println(inventory);
        inventoryRepo.save(inventory);
        return new StandardResponse(200,"Success",inventory);
    }

    @Override
    public StandardResponse updateItem(int inventoryId, InventoryDTO inventoryDTO) {
        if(inventoryRepo.existsById(inventoryId)){
            InventoryEntity inventory = inventoryRepo.getReferenceById(inventoryId);

            inventory.setItemType(inventoryDTO.getItemType());
            inventory.setItemName(inventoryDTO.getItemName());
            inventory.setBrand(inventoryDTO.getBrand());
            inventory.setItemDescription(inventoryDTO.getItemDescription());
            inventory.setPrice(inventoryDTO.getPrice());
            inventory.setExpireDate(inventoryDTO.getExpireDate());

            System.out.println(inventory);
            inventoryRepo.save(inventory);

            return new StandardResponse(200,"success",inventoryDTO);
        }else{
            throw new NotFoundException("Item Not Found");
        }
    }



    @Override
    public StandardResponse deleteInventory(int inventoryId) {
        inventoryRepo.deleteById(inventoryId);
        return new StandardResponse(200,"Deleted success",null);
    }

    @Override
    public StandardResponse getItems(int page, int size) {
        Page<InventoryEntity> inventoryEntityPage = inventoryRepo.findAll(PageRequest.of(page,size));
        List<InventoryDTO> inventoryDTOList = inventoryMapper.pageTOList(inventoryEntityPage);
        long count = inventoryRepo.count();

        PaginatedInventoryDTO paginatedInventoryDTO =new PaginatedInventoryDTO(
                inventoryDTOList,
                count
        );
        return new StandardResponse(200,"Success",paginatedInventoryDTO);
    }

//    @Override
//    public StandardResponse searchInventory(String itemName, String itemType, List<String> brands) {
//
//        List<InventoryEntity> inventoryEntities = inventoryRepo.findInventoryByCriteria(itemName,itemType,brands);
//        List<InventoryDTO> inventoryDTOS= inventoryMapper.InventoryEntityListToDTO(inventoryEntities);
//
//        return new StandardResponse(200,"Success",inventoryDTOS);
//    }

    @Override
    public StandardResponse searchInventory(int page, int size, String itemName, String itemType, List<String> brands) {
        System.out.println(brands);
        Page<InventoryEntity> inventoryEntityPage= inventoryRepo.findInventoryByCriteria(itemName,itemType,brands,PageRequest.of(page,size));
        List<InventoryDTO> inventoryDTOS= inventoryMapper.InventoryPageEntityListToDTO(inventoryEntityPage);
        return new StandardResponse(200,"Success",inventoryDTOS);
    }
}
