import { mergeProps } from "@react-aria/utils";
import { useVirtualizerState, Rect } from "@react-stately/virtualizer";
import React, { useCallback, useRef } from "react";
import {
  ScrollView,
  setScrollLeft,
  useVirtualizer,
} from "@react-aria/virtualizer";

function TableVirtualizer({
  layout,
  collection,
  focusedKey,
  renderView,
  renderWrapper,
  domRef,
  ...otherProps
}) {
  let headerRef = useRef<HTMLDivElement>();
  let bodyRef = useRef<HTMLDivElement>();
  let state = useVirtualizerState({
    layout,
    collection,
    renderView,
    renderWrapper,
    onVisibleRectChange(rect) {
      bodyRef.current.scrollTop = rect.y;
      setScrollLeft(bodyRef.current, "ltr", rect.x);
    },
    transitionDuration:
      collection.body.props.isLoading && collection.size > 0 ? 0 : 500,
  });

  let { virtualizerProps } = useVirtualizer(
    {
      focusedKey,
      scrollToItem(key) {
        let item = collection.getItem(key);
        let column = collection.columns[0];
        state.virtualizer.scrollToItem(key, {
          duration: 0,
          // Prevent scrolling to the top when clicking on column headers.
          shouldScrollY: item?.type !== "column",
          // Offset scroll position by width of selection cell
          // (which is sticky and will overlap the cell we're scrolling to).
          offsetX: column.props.isSelectionCell
            ? layout.columnWidths.get(column.key)
            : 0,
        });
      },
    },
    state,
    domRef
  );

  let headerHeight = layout.getLayoutInfo("header")?.rect.height || 0;
  let visibleRect = state.virtualizer.visibleRect;

  // Sync the scroll position from the table body to the header container.
  let onScroll = useCallback(() => {
    headerRef.current.scrollLeft = bodyRef.current.scrollLeft;
  }, [bodyRef]);

  let onVisibleRectChange = useCallback(
    (rect: Rect) => {
      state.setVisibleRect(rect);

      if (
        !collection.body.props.isLoading &&
        collection.body.props.onLoadMore &&
        state.virtualizer.contentSize.height > rect.height * 2
      ) {
        let scrollOffset =
          state.virtualizer.contentSize.height - rect.height * 2;
        if (rect.y > scrollOffset) {
          collection.body.props.onLoadMore();
        }
      }
    },
    // eslint-disable-next-line
    [collection.body.props, state.setVisibleRect, state.virtualizer]
  );

  return (
    <div {...mergeProps(otherProps, virtualizerProps)} ref={domRef}>
      <div
        role="presentation"
        style={{
          width: visibleRect.width,
          height: headerHeight,
          overflow: "hidden",
          position: "relative",
          willChange: state.isScrolling ? "scroll-position" : "",
          transition: state.isAnimating
            ? `none ${state.virtualizer.transitionDuration}ms`
            : undefined,
        }}
        ref={headerRef}
      >
        {state.visibleViews[0]}
      </div>
      <ScrollView
        role="presentation"
        // className={classNames(styles, "spectrum-Table-body")}
        style={{ flex: 1 }}
        innerStyle={{
          overflow: "visible",
          transition: state.isAnimating
            ? `none ${state.virtualizer.transitionDuration}ms`
            : undefined,
          // width: 1000,
          // height: 500,
        }}
        ref={bodyRef}
        contentSize={state.contentSize}
        onVisibleRectChange={onVisibleRectChange}
        onScrollStart={state.startScrolling}
        onScrollEnd={state.endScrolling}
        onScroll={onScroll}
      >
        {state.visibleViews[1]}
      </ScrollView>
    </div>
  );
}

export default TableVirtualizer;
