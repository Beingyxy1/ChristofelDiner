import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function CoursesScreen({ navigation, menu, setMenu }) {
  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("starter");
  const [price, setPrice] = useState("");

  const handleAddDish = () => {
    if (!dishName || !description || !price) {
      alert("Please fill in all fields.");
      return;
    }

    const newDish = {
      id: Date.now().toString(),
      dishName,
      description,
      course,
      price,
    };

    setMenu([...menu, newDish]);
    setDishName("");
    setDescription("");
    setCourse("starter");
    setPrice("");
    Keyboard.dismiss();
  };

  const handleRemoveDish = (id) => {
    setMenu(menu.filter((dish) => dish.id !== id));
  };

  const handleClearAll = () => {
    if (menu.length === 0) {
      alert("No dishes to clear.");
      return;
    }
    setMenu([]);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.backText}>← Back to Home</Text>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Christoffel Diner</Text>
          <Text style={styles.subtitle}>Add and manage your dishes easily</Text>

          {/* Dish Name */}
          <TextInput
            style={styles.input}
            placeholder="Dish name"
            placeholderTextColor="#ccc"
            value={dishName}
            onChangeText={setDishName}
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
          />

          {/* Description */}
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Description"
            placeholderTextColor="#ccc"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          {/* Course Picker */}
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Course:</Text>
            <Picker
              selectedValue={course}
              onValueChange={(itemValue) => setCourse(itemValue)}
              style={styles.picker}
              dropdownIconColor="#fff"
            >
              <Picker.Item label="Starter" value="starter" />
              <Picker.Item label="Main" value="main" />
              <Picker.Item label="Dessert" value="dessert" />
            </Picker>
          </View>

          {/* Price */}
          <TextInput
            style={styles.input}
            placeholder="Price (e.g. R60.00)"
            placeholderTextColor="#ccc"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
          />

          {/* Save Button */}
          <TouchableOpacity style={styles.button} onPress={handleAddDish}>
            <Text style={styles.buttonText}>Save Dish</Text>
          </TouchableOpacity>

          {/* Clear All Button */}
          {menu.length > 0 && (
            <TouchableOpacity
              style={[styles.button, styles.clearAllButton]}
              onPress={handleClearAll}
            >
              <Text style={styles.clearAllText}>Clear All Dishes</Text>
            </TouchableOpacity>
          )}

          {/* Filter Button */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#4b0082" }]}
            onPress={() => navigation.navigate("Filter", { menu })}
          >
            <Text style={styles.buttonText}>Filter by Course</Text>
          </TouchableOpacity>

          {/* Menu List */}
          <Text style={styles.menuTitle}>Current Menu</Text>
          {menu.length === 0 ? (
            <Text style={styles.noDishesText}>No dishes added yet.</Text>
          ) : (
            <FlatList
              data={menu}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View style={styles.dishCard}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.dishName}>{item.dishName}</Text>
                    <Text style={styles.dishDescription}>{item.description}</Text>
                    <Text style={styles.courseText}>
                      {item.course.toUpperCase()}
                    </Text>
                    <Text style={styles.priceText}>R{item.price}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveDish(item.id)}
                  >
                    <Text style={styles.removeText}>✕</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  scrollContent: { paddingBottom: 60 },
  backButton: {
    position: "absolute",
    top: 15,
    left: 15,
    backgroundColor: "#4b0082",
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 50,
    borderRadius: 20,
    zIndex: 10,
  },
  backText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000ff",
    marginTop: 70,
  },
  subtitle: {
    textAlign: "center",
    color: "#b105a8ff",
    fontSize: 14,
    marginTop: 10,
    marginBottom: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: "#4b0082",
    backgroundColor: "#2e2e5b",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    color: "#fff",
  },
  pickerContainer: { marginBottom: 15 },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4b0082",
    marginBottom: 5,
  },
  picker: {
    backgroundColor: "#ffffffff",
    color: "#6b2fb9ff",
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#5d3fd3",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  clearAllButton: { backgroundColor: "#a020f0" },
  clearAllText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  menuTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  noDishesText: { textAlign: "center", color: "#000000ff", marginBottom: 20 },
  dishCard: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#4b0082",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    backgroundColor: "#3b3b6d",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  dishName: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  dishDescription: { color: "#c9c9ff", marginTop: 4 },
  courseText: { color: "#a8a8ff", marginTop: 5, fontStyle: "italic" },
  priceText: { fontWeight: "bold", color: "#fff", marginTop: 5 },
  removeButton: {
    marginLeft: 10,
    backgroundColor: "#ff4d4d",
    borderRadius: 20,
    padding: 6,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  removeText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
