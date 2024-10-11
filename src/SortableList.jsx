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
                  border: "1px solid lightgrey",
                  margin: 2,
                  borderRadius: 8,
                  width: "min-content",
                  minWidth: 260,
                  backgroundColor: item.checked ? "white" : "lightgrey",
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
