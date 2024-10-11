import React, { useState } from "react";
import { Checkbox, Flex, List } from "antd";
import {
  closestCenter,
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { HolderOutlined } from "@ant-design/icons";
import styles from "./SortableList.module.scss";

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
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 50,
        tolerance: 3,
      },
    }),
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
        delay: 0,
        tolerance: 0,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
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
          className={styles.list}
          dataSource={items}
          bordered
          // style={{ width: "100%", minWidth: 260, maxWidth: 320 }}
          renderItem={(item) => (
            <SortableItem key={item.id} id={item.id}>
              <List.Item
                className={styles.item}
                style={{
                  backgroundColor: item.checked ? "white" : "#f1f1f1",
                }}
              >
                <Flex justify="space-between" style={{ width: "100%" }}>
                  <HolderOutlined />
                  {item.content}
                  <Checkbox
                    style={{ touchAction: "none" }}
                    checked={item.checked}
                    onChange={() =>
                      setItems((prev) =>
                        prev.map((i) =>
                          i.id === item.id ? { ...i, checked: !i.checked } : i
                        )
                      )
                    }
                    onMouseDown={(e) => {
                      e.stopPropagation();
                    }}
                    onTouchStart={(e) => {
                      e.stopPropagation();
                    }}
                    onTouchEnd={(e) => {
                      e.stopPropagation();
                    }}
                    data-touch-action="auto"
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
