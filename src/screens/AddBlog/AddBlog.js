import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, Card, Input } from "react-native-elements";
import { AllPost } from "../../Context/AllPostsContext";
import { AuthContext } from "../../Context/AuthContext";
import { url } from "../../Context/Url";
import { techCategory } from "../../UtilityFunction/categoryList";
import capitalize from "../../UtilityFunction/toCapitalize";
import CategoryHero from "../../components/CategoryHero/CategoryHero";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [error, setError] = useState(null);
  const [displayImage, setDisplayImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { authData } = React.useContext(AuthContext);
  const windowHeight = Dimensions.get("window").height;
  const { setTriggerPost, triggerPost } = React.useContext(AllPost);

  const handleImageSelect = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");

      return;
    }

    const imageResult = await ImagePicker.launchImageLibraryAsync();

    if (!imageResult.cancelled) {
      setImage({
        uri: imageResult.uri,
        type: `test/${imageResult.uri.split(".")[1]}`,
        name: `test.${imageResult.uri.split(".")[1]}`,
      });
      setDisplayImage(imageResult.uri);
    }
  };
  const uploadImageToCloudinary = async (imageUrl) => {
    try {
      const imgData = new FormData();
      imgData.append("file", image);
      imgData.append("upload_preset", "csyt0qle");
      imgData.append("cloud_name", "dmyyyzg6r");
      console.log(imgData);
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dmyyyzg6r/image/upload",
        {
          method: "POST",

          body: imgData,
        }
      );

      const data = await response.json();
      setImageUri(data?.secure_url);
      return {
        status: true,
        data: data?.secure_url,
      };
    } catch (error) {
      console.error(error);
      return {
        status: false,
      };
    }
  };

  const handlePostSubmit = async () => {
    setLoading(true);
    if (
      title.trim() === "" ||
      description.trim() === "" ||
      category.trim() === "" ||
      displayImage === null
    ) {
      setError("All fields are required");
      setLoading(false);
      return;
    }
    //call the upload image function
    const data = await uploadImageToCloudinary(image);
    if (data.status === false) {
      setError("Something went wrong");
      setLoading(false);
      return;
    }

    const blogData = {
      title: title,
      description: description,
      category: category,
      image_url: data?.data,
    };
    //console.log(blogData);
    //call the api to post the data
    const response = await fetch(`${url}/api/blog/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${authData?.token}`,
      },
      body: JSON.stringify(blogData),
    });
    const result = await response.json();
    console.log(result);
    if (result?.status === "success") {
      setLoading(false);
      alert("Blog added successfully");
      setTitle("");
      setDescription("");
      setCategory("");
      setImage(null);
      setImageUri(null);
      setDisplayImage(null);
      setTriggerPost(!triggerPost);
      return;
    } else {
      setLoading(false);
      alert("Something went wrong");
      return;
    }
  };

  //useeffect to clear the error
  React.useEffect(() => {
    const clearError = setTimeout(() => {
      setError(null);
    }, 3000);
    return () => clearTimeout(clearError);
  }, [error]);

  return (
    <ScrollView contentContainerStyle={{ minHeight: windowHeight }}>
      {loading ? (
        <Loading />
      ) : (
        <View>
          <CategoryHero category="Add Blog" />
          <View style={{ marginVertical: 40 }}>
            <Card>
              <Input
                placeholder="Title"
                value={title}
                onChangeText={(text) => setTitle(text)}
              />
              <Input
                placeholder="Description"
                value={description}
                onChangeText={(text) => setDescription(text)}
              />
              <Picker
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
              >
                <Picker.Item label="Select a category" value="" />

                {techCategory.map((item) => (
                  <Picker.Item
                    key={item?.id}
                    label={capitalize(item?.value)}
                    value={item?.value}
                  />
                ))}
                {/* Add more categories as needed */}
              </Picker>
              <View>
                <Button
                  title="Upload Image"
                  buttonStyle={{
                    borderColor: "#dc3545",
                  }}
                  type="outline"
                  raised
                  titleStyle={{ color: "#dc3545" }}
                  containerStyle={{
                    marginVertical: 10,
                  }}
                  onPress={handleImageSelect}
                />

                {displayImage && (
                  <Image
                    source={{ uri: displayImage }}
                    style={{
                      width: 200,
                      height: 200,
                      marginVertical: 10,
                      borderRadius: 10,
                    }}
                  />
                )}
              </View>
              {error && (
                <Text
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    marginVertical: 5,
                  }}
                >
                  {error}
                </Text>
              )}
              <Button
                title="Submit"
                raised
                buttonStyle={{ backgroundColor: "#dc3545" }}
                containerStyle={{
                  marginVertical: 10,
                  borderRadius: 20,
                }}
                onPress={() => handlePostSubmit()}
              />
            </Card>
          </View>
        </View>
      )}
      {!loading && <Footer />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageButton: {
    padding: 10,
    marginVertical: 10,
  },
  submitButton: {
    marginVertical: 10,
  },
});

export default AddBlog;
