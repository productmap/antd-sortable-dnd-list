import React, { useState } from "react";
import { Checkbox, Flex, List } from "antd";
import {
  closestCenter,
  DndContext,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { HolderOutlined } from "@ant-design/icons"; // Мы создадим этот компонент ниже

const SortableList = () => {
  const [items, setItems] = useState([
    { id: "1", content: "Item 1", checked: true },
    { id: "2", content: "Item 2", checked: true },
    { id: "3", content: "Item 3", checked: true },
    { id: "4", content: "Item 4", checked: true },
    { id: "5", content: "Item 5", checked: true },
    { id: "6", content: "Item 6", checked: true },
    { id: "7", content: "Item 7", checked: false },
  ]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <List
          dataSource={items}
          bordered
          style={{ width: "min-content" }}
          renderItem={(item) => (
            <SortableItem key={item.id} id={item.id}>
              <List.Item
                style={{
                  margin: 8,
                  borderRadius: 8,
                  width: "min-content",
                  minWidth: 260,
                  backgroundColor: item.checked ? "white" : "#f1f1f1",
                  boxShadow:
                    "0 0 0 1px rgba(63, 63, 68, 0.05), 0 1px 3px 0 rgba(34, 33, 81, 0.15)",
                }}
              >
                <Flex justify="space-between" style={{ width: "100%" }}>
                  <HolderOutlined />
                  {item.content}
                  <Checkbox
                    checked={item.checked}
                    onChange={() =>
                      setItems((prev) =>
                        prev.map((i) =>
                          i.id === item.id ? { ...i, checked: !i.checked } : i
                        )
                      )
                    }
                  />
                </Flex>
              </List.Item>
            </SortableItem>
          )}
        />
      </SortableContext>
    </DndContext>
  );
};

export default SortableList;
