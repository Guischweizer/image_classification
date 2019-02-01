import React, { Component } from "react";
import bird from "./bird.jpg";
import "./Style.css";
import * as ml5 from "ml5";

class App extends Component {
    state = {
        predictions: []
    };
    setPredictions = pred => {
        this.setState({ predictions: pred });
    };
    classifyImg = () => {
        // Initialize the Image Classifier method with MobileNet
        const classifier = ml5.imageClassifier("MobileNet", modelLoaded);
        // When the model is loaded
        function modelLoaded() {
            console.log("Model Loaded!");
        }
        // Put the image to classify inside a variable
        const image = document.getElementById("image");
        console.log("image", image);
        // Make a prediction with a selected image
        classifier
            .predict(image, 5, function(err, results) {
                return results;
            })
            .then(results => {
                this.setPredictions(results);
            });
    };

    componentDidMount() {
        this.classifyImg();
    }

    render() {
        // First set the predictions to a default value while loading
        let predictions = <div className="loader" />;
        // Map over the predictions and return each prediction with probability
        if (this.state.predictions.length > 0) {
            predictions = this.state.predictions.map((pred, i) => {
                let { className, probability } = pred;
                // round the probability with 2 decimal
                probability = Math.floor(probability * 10000) / 100 + "%";
                return (
                    <div key={i + ""}>
                        {i + 1}. Prediction: {className} at {probability}{" "}
                    </div>
                );
            });
        }

        return (
            <div className="App">
                <h1>Image Classification</h1>
                <img src={bird} alt="" id="image" width="400" />
                {predictions}
            </div>
        );
    }
}

export default App;
