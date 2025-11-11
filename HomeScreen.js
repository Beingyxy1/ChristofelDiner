import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen({ navigation, menu }) {
  const [totalCourses, setTotalCourses] = useState(0);
  const [averages, setAverages] = useState({ starter: 0, main: 0, dessert: 0 });

  useFocusEffect(
    useCallback(() => {
      setTotalCourses(menu.length);

      // ✅ Calculate average prices per course
      const courseTypes = ["starter", "main", "dessert"];
      const newAverages = {};

      courseTypes.forEach((type) => {
        const filtered = menu.filter((dish) => dish.course === type);
        if (filtered.length > 0) {
          const total = filtered.reduce(
            (sum, dish) => sum + parseFloat(dish.price || 0),
            0
          );
          newAverages[type] = (total / filtered.length).toFixed(2);
        } else {
          newAverages[type] = 0;
        }
      });

      setAverages(newAverages);
    }, [menu])
  );

  return (
    <View style={styles.container}>
      <View style={styles.topCurve} />

      {/* Header */}
      <Text style={styles.title}>
        Christoffel{"\n"}
        <Text style={styles.subtitle}>Diner</Text>
      </Text>

      {/* Courses info */}
      <View style={styles.courseBox}>
        <Text style={styles.courseText}>Courses</Text>
        <Text style={styles.courseNumber}>{totalCourses}</Text>
      </View>

      {/* Image */}
      <Image
        source={require("./assets/logo.png")}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Dynamic Prices Section */}
      <View style={styles.priceBox}>
        <Text style={styles.priceTitle}>Average Price per Course</Text>
        <Text style={styles.priceItem}>
          Starters{" "}
          <Text style={styles.priceValue}>
            R{averages.starter !== 0 ? averages.starter : "-"}
          </Text>
        </Text>
        <Text style={styles.priceItem}>
          Mains{" "}
          <Text style={styles.priceValue}>
            R{averages.main !== 0 ? averages.main : "-"}
          </Text>
        </Text>
        <Text style={styles.priceItem}>
          Desserts{" "}
          <Text style={styles.priceValue}>
            R{averages.dessert !== 0 ? averages.dessert : "-"}
          </Text>
        </Text>
      </View>

      {/* Navigation Buttons */}
      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={() => navigation.navigate("Courses")}
      >
        <Text style={styles.getStartedText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingTop: 60,
  },
  topCurve: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 180,
    backgroundColor: "#0033A0",
    borderBottomRightRadius: 200,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF00FF",
    alignSelf: "flex-start",
    marginLeft: 30,
  },
  subtitle: {
    color: "#FF00FF",
  },
  courseBox: {
    backgroundColor: "#EAEAEA",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    marginTop: 100,
    width: "80%",
    marginBottom: 20,
  },
  courseText: {
    fontSize: 18,
    color: "#333",
  },
  courseNumber: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0033A0",
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 20,
  },
  priceBox: {
    backgroundColor: "#EAEAEA",
    borderRadius: 15,
    padding: 15,
    width: "80%",
    marginBottom: 40,
  },
  priceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  priceItem: {
    fontSize: 16,
    color: "#333",
    marginVertical: 3,
  },
  priceValue: {
    color: "#0033A0",
    fontWeight: "bold",
  },
  getStartedButton: {
    backgroundColor: "#0033A0",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    position: "absolute",
    bottom: 40,
    marginBottom: 60,
    elevation: 4,
  },
  getStartedText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
