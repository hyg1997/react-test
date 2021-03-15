import {AutoSizer, List as VirtualizedList, WindowScroller} from "react-virtualized";
import React from "reactn";

export const List = props => (
    <WindowScroller>
        {({height}) => (
            <AutoSizer disableHeight>
                {({width}) => (
                    <VirtualizedList height={height}
                                     width={width}
                                     rowHeight={50}
                                     rowRenderer={obj => props.renderRow(obj, props.data)}
                                     overscanRowCount={2}
                                     estimatedRowSize={2}
                                     rowCount={props.data.length}
                    />
                )}
            </AutoSizer>
        )}
    </WindowScroller>
);
