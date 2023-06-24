import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Pagination = ({ page, setPage, totalPageNumber }) => {
  const visiblePages = 3; // Number of visible page numbers
  const ellipsis = "...";
  const getPageNumbers = () => {
    const totalPages = totalPageNumber;
    const currentPage = page;
    const pageNumbers = [];
    const edgeVisiblePages = Math.floor(visiblePages / 2);
    const middleVisiblePages = visiblePages - edgeVisiblePages - 1;

    let startPage = currentPage - middleVisiblePages;
    let endPage = currentPage + middleVisiblePages;

    if (startPage <= 0) {
      endPage += Math.abs(startPage) + 1;
      startPage = 1;
    }

    if (endPage > totalPages) {
      startPage -= endPage - totalPages;
      endPage = totalPages;
    }

    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push(ellipsis);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(ellipsis);
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <View style={styles.container}>
      {page === 1 ? (
        <View style={styles.disabledButton}>
          <Text style={styles.buttonText}>{"<"}</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setPage(page - 1)}
        >
          <Text style={styles.buttonText}>{"<"}</Text>
        </TouchableOpacity>
      )}

      {/* Render page numbers here */}
      {getPageNumbers().map((item, index) =>
        item === ellipsis ? (
          <Text key={index} style={styles.button}>
            {ellipsis}
          </Text>
        ) : (
          <TouchableOpacity
            style={[styles.button, page === item && styles.currentButton]}
            key={index}
            onPress={() => setPage(item)}
          >
            <Text
              style={[
                styles.buttonText,
                page === item && styles.currentButtonText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )
      )}

      {page === totalPageNumber ? (
        <View style={styles.disabledButton}>
          <Text style={styles.buttonText}>{">"}</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setPage(page + 1)}
        >
          <Text style={styles.buttonText}>{">"}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 36,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 4,
    backgroundColor: "#ffffff",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 4,
  },
  disabledButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 4,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: "#dddddd",
  },
  currentButton: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  currentButtonText: {
    color: "#fff",
  },
});

export default Pagination;
