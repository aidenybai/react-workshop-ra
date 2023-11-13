import React, { useState, useEffect } from "react";
import styled from "constants/DefaultTheme";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ItemWrapper = styled.div`
  padding-right: 0;
  margin: 8px 0 0 0;
`;

const DroppableWrapper = styled.div`
  width: 250px;
`;

type RenderComponentProps = {
  index: number;
  item: {
    label: string;
    isDerived?: boolean;
  };
  deleteOption: (index: number) => void;
  updateOption: (index: number, value: string) => void;
  toggleVisibility?: (index: number) => void;
  onEdit?: (index: number) => void;
};

interface DroppableComponentProps {
  items: Array<Record<string, unknown>>;
  renderComponent: (props: RenderComponentProps) => JSX.Element;
  deleteOption: (index: number) => void;
  updateOption: (index: number, value: string) => void;
  toggleVisibility?: (index: number) => void;
  updateItems: (items: Array<Record<string, unknown>>) => void;
  onEdit?: (index: number) => void;
}

const DroppableComponent: React.FC<DroppableComponentProps> = ({
  items,
  renderComponent,
  deleteOption,
  updateOption,
  toggleVisibility,
  updateItems,
  onEdit,
}) => {
  const [stateItems, setStateItems] = useState(items);

  useEffect(() => {
    if (items.length !== stateItems.length || JSON.stringify(items) !== JSON.stringify(stateItems)) {
      setStateItems(items);
    }
  }, [items, stateItems]);

  const onDragEnd = (result: any) => {
    const { destination, source } = result;
    const newItems = Array.from(stateItems);
    const sourceIndex = source.index;
    let destinationIndex;
    if (!destination) {
      destinationIndex = newItems.length;
    } else {
      if (destination.droppableId === source.droppableId && destination.index === source.index) {
        return;
      }
      destinationIndex = destination.index;
    }
    const [removed] = newItems.splice(sourceIndex, 1);
    newItems.splice(destinationIndex, 0, removed);
    setStateItems(newItems);
    updateItems(newItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {({ innerRef, droppableProps, placeholder }) => (
          <DroppableWrapper
            ref={innerRef as React.Ref<HTMLDivElement>}
            {...droppableProps}
          >
            {stateItems.map((item: { id: string } & any, index: number) => (
              <Draggable draggableId={item.id} key={item.id} index={index}>
                {({ innerRef, draggableProps, dragHandleProps }) => (
                  <ItemWrapper
                    ref={innerRef as React.Ref<HTMLDivElement>}
                    {...draggableProps}
                    {...dragHandleProps}
                    style={{
                      ...draggableProps.style,
                      userSelect: "none",
                      position: "static",
                    }}
                  >
                    {renderComponent({
                      deleteOption,
                      updateOption,
                      toggleVisibility,
                      onEdit,
                      item,
                      index,
                    })}
                  </ItemWrapper>
                )}
              </Draggable>
            ))}
            {placeholder}
          </DroppableWrapper>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DroppableComponent;
