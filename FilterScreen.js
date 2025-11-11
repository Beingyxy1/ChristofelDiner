import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function FilterScreen({ route, navigation }) {
  const { menu } = route.params;
  const [selectedCourse, setSelectedCourse] = useState("all");

  // Filter the menu based on selected course
  const filteredMenu =
    selectedCourse === "all"
      ? menu
      : menu.filter((dish) => dish.course === selectedCourse);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.title}>Filter by Course</Text>
      <Text style={styles.subtitle}>Select a category to view dishes</Text>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {["all", "starter", "main", "dessert"].map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.filterButton,
              selectedCourse === type && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedCourse(type)}
          >
            <Text
              style={[
                styles.filterText,
                selectedCourse === type && styles.filterTextActive,
              ]}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Filtered Dishes */}
      <Text style={styles.resultsTitle}>
        Showing: {selectedCourse === "all" ? "All Courses" : selectedCourse}
      </Text>

      {filteredMenu.length === 0 ? (
        <Text style={styles.noDishesText}>No dishes available.</Text>
      ) : (
        <FlatList
          data={filteredMenu}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.dishName}>{item.dishName}</Text>
                <Text style={styles.dishDescription}>{item.description}</Text>
                <Text style={styles.courseText}>
                  {item.course.toUpperCase()}
                </Text>
                <Text style={styles.priceText}>R{item.price}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:60,
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "#4b0082",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 10,
  },
  backText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    color: "#a020f0",
    fontSize: 14,
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: "#EAEAEA",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  filterButtonActive: {
    backgroundColor: "#4b0082",
  },
  filterText: {
    color: "#333",
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#fff",
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0033A0",
    textAlign: "center",
    marginBottom: 10,
  },
  noDishesText: {
    textAlign: "center",
    color: "#999",
    fontSize: 16,
    marginTop: 20,
  },
  listContainer: {
    paddingBottom: 50,
  },
  card: {
    borderWidth: 1,
    borderColor: "#4b0082",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    backgroundColor: "#f4f4fb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  dishName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4b0082",
  },
  dishDescription: {
    color: "#555",
    marginTop: 4,
  },
  courseText: {
    color: "#a020f0",
    marginTop: 5,
    fontStyle: "italic",
  },
  priceText: {
    fontWeight: "bold",
    color: "#000",
    marginTop: 5,
  },
});
