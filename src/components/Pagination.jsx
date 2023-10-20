import React, { useContext, useEffect, useState } from "react";
import ListItem from "./list/ListItem";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";
import { Button, ButtonGroup } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";
import { ThemeContext } from "./context/ThemeContext";

const Pagination = ({
  listItems,
  setEditModalOpen,
  editModalOpen,
  setSelectedCategory,
  setEditItemID,
  editItemID,
  selectedCategory,
  currentPage,
  setCurrentPage,
}) => {
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredItems =
    selectedCategory === ""
      ? listItems
      : listItems.filter((item) => item.category === selectedCategory);

  const totalItems = filteredItems.length;
  const pagesAmount = Math.ceil(totalItems / itemsPerPage);

  const firstIndex = (currentPage - 1) * itemsPerPage;
  const lastIndex = firstIndex + itemsPerPage;

  const itemsOnCurrentPage = filteredItems.slice(firstIndex, lastIndex);

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    } else if (currentPage === 1 && selectedCategory !== "") {
      setCurrentPage(1);
      setSelectedCategory("");
    }
  };

  const changeCurrentPage = (id) => {
    setCurrentPage(id);
  };

  const nextPage = () => {
    if (currentPage !== pagesAmount) {
      setCurrentPage(currentPage + 1);
    } else if (currentPage === pagesAmount && selectedCategory !== "") {
      setCurrentPage(1);
      setSelectedCategory("");
    }
  };

  if (itemsOnCurrentPage.length === 0 && currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
  useEffect(() => {
    if (filteredItems.length === 0) {
      prevPage();
    }
  }, [filteredItems]);

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
  };

  const { theme } = useContext(ThemeContext);
  return (
    <div className=" mb-[30px] ">
      <div>
        {itemsOnCurrentPage.map((item) => (
          <ListItem
            item={item}
            key={item.id}
            setEditModalOpen={setEditModalOpen}
            editModalOpen={editModalOpen}
            setEditItemID={setEditItemID}
            editItemID={editItemID}
          />
        ))}
      </div>

      <div
        style={{
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: "37px",
          display: "flex",
          alignItems: "center",
          gap: "30px",
        }}
      >
        <Typography variant="p">Rows per page:</Typography>

        <div>
          <FormControl sx={{ minWidth: 22 }} size="small">
            <Select
              id="perPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              size="small"
              sx={{
                backgroundColor: theme === "dark" ? "#fff" : "",
              }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={8}>8</MenuItem>
            </Select>
          </FormControl>
        </div>
        <ButtonGroup
          variant="text"
          color="primary"
          aria-label="pagination"
          sx={{ marginY: 2, display: "flex", alignItems: "center" }}
        >
          <Typography variant="p" sx={{ marginRight: "20px" }}>
            {firstIndex + 1}-{Math.min(lastIndex, totalItems)} of {totalItems}
          </Typography>

          <Button onClick={prevPage}>
            {" "}
            <MdOutlineChevronLeft
              className={`text-${
                theme === "dark" ? "white" : "black"
              } text-[26px]`}
            />
          </Button>
          {/* {[...Array(pagesAmount).keys()].map((number) => (
                        <Button
                            key={number + 1}
                            onClick={() => changeCurrentPage(number + 1)}
                            sx={{ backgroundColor: number + 1 === currentPage ? "#4caf50" : "transparent" }}
                        >
                            {number + 1}
                        </Button>
                    ))} */}
          <Button onClick={nextPage}>
            {" "}
            <MdOutlineChevronRight
              className={`text-${
                theme === "dark" ? "white" : "black"
              } text-[26px]`}
            />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default Pagination;
