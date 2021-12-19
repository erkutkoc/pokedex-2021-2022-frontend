require ('granim');

var granimInstance = new Granim({
    element: '#canvas-interactive',
    name: 'interactive-gradient',
    elToSetClassOn: '.canvas-interactive-wrapper',
    direction: 'diagonal',
    isPausedWhenNotInView: true,
    stateTransitionSpeed: 500,
    states : {
        "default-state": {
            gradients: [
                ['#FF0000', '#3B4CCA'],
                ['#FFDE00', '#CC0000']
            ]
        },
        "Grass": {
            gradients: [
                ['#5FC314', '#C1F376'],
                ['#A1DF30', '#37AE8F']
            ]
        },
        "Poison": {
            gradients: [
                ['#c41b5a', '#65066d'],
                ['#c682bc', '#71769d']
            ]
        },
        "Fire": {
            gradients: [
                ['#801100', '#ff7500'],
                ['#FAC000', '#D73502']
            ]
        },
        "Flying": {
            gradients: [
                ['#DBf4e0', '#F4E7EC'],
                ['#CAE3f5', '#FBF3EF']
            ]
        },
        "Water": {
            gradients: [
                ['#2384eb', '#a7afca'],
                ['#7fccea', '#253e92']
            ]
        },
        "Bug": {
            gradients: [
                ['#499801', '#c25714'],
                ['#fee9b2', '#499801']
            ]
        },
        "Normal": {
            gradients: [
                ['#aaaaaa', '#eeeeee'],
                ['#cccccc', '#888888']
            ]
        },
        "Ground": {
            gradients: [
                ['#d47b4a', '#684132'],
                ['#dd866e', '#c8b5aa']
            ]
        },
        "Electric": {
            gradients: [
                ['#FEDA00', '#68c2FF'],
                ['#068ffc', '#FFEE81']
            ]
        },
        "Fairy": {
            gradients: [
                ['#FC98D3', '#FECCAC'],
                ['#FFE6D7', '#FFDBEF']
            ]
        },
        "Fighting": {
            gradients: [
                ['#b41c24', '#946e5b'],
                ['#cecd9f', '#dc5e5a']
            ]
        },
        "psychic": {
            gradients: [
                ['#E54ED0', '#000761'],
                ['#9f4580', '#44008b']
            ]
        },
        "Steel": {
            gradients: [
                ['#d1e1f6', '#cccccc'],
                ['#d8d8d8', '#b0c4de']
            ]
        },
        "Ice": {
            gradients: [
                ['#3F7EB3', '#AEDBF0'],
                ['#E2FCFF', '#CBF1FA']
            ]
        },
        "Rock": {
            gradients: [
                ['#1e0707', '#581c09'],
                ['#f7dcc3', '#8f3c17']
            ]
        },
        "Ghost": {
            gradients: [
                ['#3d5496', '#5c6cac'],
                ['#c4bce4', '#2c3d65']

            ]
        },
        "Dragon": {
            gradients: [
                ['#d52318', '#4e648e'],
                ['#bc869e', '#d2ba89']

            ]
        },
        "Dark": {
            gradients: [
                ['#23395d', '#192841'],
                ['#1c2e4a', '#203354']

            ]
        }


    }
});

const changerBack = async (element) => {
    console.log(element);
   granimInstance.changeState(element.toString());
}




