import React, { useEffect, useState } from "react";

import _ from "lodash";
import { ICONS } from "../_constants";
import { InputSearch } from "./InputSearch";

import PropTypes from "prop-types";
import SvgIcon from "@material-ui/core/SvgIcon";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import Collapse from "@material-ui/core/Collapse";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support

export const CreinoxTreeview = ({ data, onGetBySearch, onSelect }) => {
  const classes = useStyles();

  const [selectedNode, setselectedNode] = useState();
  const [filterNodeList, setFilterNodeList] = useState([]);
  const [expandedNodes, setExpandedNodes] = useState([])
  const [treeObject, setTreeObject] = useState();

  //========================================handle
  const handleOnClick = (node, e) => {
    e.stopPropagation();
    setselectedNode(node);
  };

  const handleOnSearch = (value, e) => {
    if (!value) {
        setFilterNodeList(["0"])
        // setExpandedNodes(["0"])
        return;
    }

    if (data && data.rows) {
      const filterString = value.toLowerCase();
      const foundNodes = _.filter(data.rows, item => {
        let returnValue = false;

        const compareStringName = item.name && item.name.toLowerCase();
        const compareStringEName = item.ename && item.ename.toLowerCase();
        const compareStringStartCode =
          item.startCode && item.startCode.toLowerCase();

        returnValue =
          returnValue || compareStringName.indexOf(filterString) >= 0;
        returnValue =
          returnValue || compareStringEName.indexOf(filterString) >= 0;
        returnValue =
          returnValue || compareStringStartCode.indexOf(filterString) >= 0;

        return returnValue;
      });

      // 设置节点列表用以显示背景
      setFilterNodeList(foundNodes);

      // 展开搜到的节点
      let filterExpanded = [];
      foundNodes.map(item => {
        const returnValue = item.path && item.path.split(",");
        filterExpanded = filterExpanded.concat(
          returnValue.filter(v => !filterExpanded.includes(v))
        ); 
        return null;
      });
      setExpandedNodes(filterExpanded);

      // 选中搜到的第一个节点
      setselectedNode(foundNodes[0]);
    }
  };

  const handleOnToggle = (x, value) => {
     setExpandedNodes(value);
  }

  //========================================generate tree
  useEffect(() => {
    if (!(data && data.rows)) {
      // first fetch
      onGetBySearch();
    } else {
      // turn data to tree structure
      dataToTree(data.rows);
    }
  }, [data, onGetBySearch]);

  useEffect(() => {
    if (typeof onSelect === "function") {
      onSelect(selectedNode);
    }
  }, [selectedNode]);

  const dataToTree = dataRows => {
    const dataRowsShorted = _.orderBy(dataRows, ["path"], ["asc"]);
    const treeObjectTemp = {};
    dataRowsShorted.map((item) => {
      const pathArray = item.path.split(",");

      let pathWithChildren = "";

      // 循环往树上堆branch. 用lodash的path
      for (let i = 0; i < pathArray.length; i++) {
        pathWithChildren += pathArray[i] + ".";
        pathWithChildren += "children.";
      }

      pathWithChildren += item.id.toString();
      _.setWith(treeObjectTemp, pathWithChildren, item, Object);
    });
    setTreeObject(treeObjectTemp);
  };

  const getBranches = node => {
    if (node && node.children) {
      return Object.keys(node.children).map(key => {

        const childNode = node.children[key];
        const nodeId = childNode.id || 0;
        const style = {};
        const isSearched = !_.isEmpty(_.find(filterNodeList, item=>{return item.id === nodeId}))
        const isSelected = selectedNode && selectedNode.id === nodeId
        style.color = isSelected ? "#F00000" : "#333333";
        style.backgroundColor = isSearched? "rgba(200,230,255, 0.7)": "rgba(200,230,255, 0)";

        console.log("is searched?", isSearched)

        const label = (
          <div             
            style={style}>
            {childNode.name || "main"} 
            <span className="ml-2">[{childNode.ename || null}]</span>
            <IconButton
              size="small"
              onClick={handleOnClick.bind(null, childNode)}
              className="ml-3"
            >
              {ICONS.EDIT()}
            </IconButton>
          </div>
        );


        
        //foundNodes
        return (
          <StyledTreeItem
            nodeId={nodeId.toString()}
            key={nodeId}
            label={label}

          >
            {getBranches(childNode)}
          </StyledTreeItem>
        );
      });
    }
  };

  //======================================== render
  return (
    <>
      <InputSearch onSearch={handleOnSearch}/>
      <TreeView
        className={classes.root}
        onNodeToggle={handleOnToggle}
        expanded={expandedNodes}
        defaultCollapseIcon={<MinusSquare />}
        defaultExpandIcon={<PlusSquare />}
        defaultEndIcon={<CloseSquare />}
      >
        {treeObject && treeObject[0] && getBranches(treeObject[0])}
      </TreeView>
    </>
  );
};

//------------------------------------------------------样式

function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon className="close" fontSize="inherit" {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

function TransitionComponent(props) {
  const style = useSpring({
    from: { opacity: 0, transform: "translate3d(20px,0,0)" },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`
    }
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool
};

const StyledTreeItem = withStyles(theme => ({
  iconContainer: {
    "& .close": {
      opacity: 0.3
    }
  },
  group: {
    marginLeft: 12,
    paddingLeft: 12,
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`
  }
}))(props => <TreeItem {...props} TransitionComponent={TransitionComponent} />);

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});
