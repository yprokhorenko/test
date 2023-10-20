import React, { useState } from "react";
import { useSelector } from "react-redux";
import Requisition from "../RequisitionModal";
import Pagination from "../Pagination";
import EditModal from "../EditModal";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { AiFillPlusCircle } from "react-icons/ai";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const List = () => {
  const { theme } = useContext(ThemeContext);
  const styles = theme === "dark" ? "text-[white]" : "light";

  const [isRequisitionOpen, setIsRequisitionOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editItemID, setEditItemID] = useState();
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const listItems = useSelector((state) => state.main.productsList);
  const uniqueItemsCategories = [
    ...new Set(listItems.map((item) => item.category)),
  ];
  const requisition = () => {
    setIsRequisitionOpen(!isRequisitionOpen);
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const displayedItems =
    selectedCategory === ""
      ? listItems
      : listItems.filter((item) => item.category === selectedCategory);

  const filteredItems = displayedItems.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className={` ${styles} `}>
      <Box style={{ display: "flex", gap: "40px", marginBottom: "40px" }}>
        <InputLabel
          id="outlined-basic"
          sx={{
            color: theme === "dark" ? "#eee" : "",
            borderRadius: "3px",
          }}
        ></InputLabel>

        <TextField
          sx={{
            color: theme === "dark" ? "#eee" : "",
            backgroundColor: theme === "dark" ? "#cacaca" : "",
            borderRadius: "4px",
          }}
          size="small"
          id="outlined-basic"
          label="Name"
          variant="outlined"
          type="text"
          placeholder="Search items..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <FormControl sx={{ minWidth: 220 }} size="small">
          <InputLabel
            id="category"
            sx={{
              color: theme === "dark" ? "#000000c0" : "",
              borderRadius: "3px",
            }}
          >
            Category
          </InputLabel>
          <Select
            labelId="category"
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            size="small"
            label="Category"
            sx={{
              backgroundColor: theme === "dark" ? "#cacaca" : "",
              color: theme === "dark" ? "#000000c0" : "",
            }}
          >
            <MenuItem value={"\u00A0"}>&nbsp;</MenuItem>
            {uniqueItemsCategories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {isRequisitionOpen && (
        <Requisition
          setIsRequisitionOpen={setIsRequisitionOpen}
          isRequisitionOpen={isRequisitionOpen}
        />
      )}
      {editModalOpen && (
        <EditModal
          setEditModalOpen={setEditModalOpen}
          editModalOpen={editModalOpen}
          editItemID={editItemID}
        />
      )}

      <div style={{ display: "flex", gap: "85px", paddingBottom: "20px" }}>
        <Typography variant="subtitle1" color={theme === "dark" ? "#999 " : ""}>
          Category
        </Typography>
        <Typography variant="subtitle1" color={theme === "dark" ? "#999 " : ""}>
          Name
        </Typography>
        <Typography variant="subtitle1" color={theme === "dark" ? "#999 " : ""}>
          Text
        </Typography>
      </div>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        listItems={filteredItems}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setEditModalOpen={setEditModalOpen}
        editModalOpen={editModalOpen}
        setEditItemID={setEditItemID}
        editItemID={editItemID}
      />

      <Button
        color="success"
        onClick={requisition}
        variant="outlined"
        startIcon={<AiFillPlusCircle />}
        size="small"
        style={{ backgroundColor: theme === "dark" ? "white" : undefined }}
      >
        Requisition
      </Button>
    </div>
  );
};

export default List;
