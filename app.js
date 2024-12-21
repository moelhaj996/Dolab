class VirtualTryOn {
    constructor() {
        this.imageUpload = document.getElementById('imageUpload');
        this.descriptionBox = document.getElementById('clothingDescription');
        this.generateBtn = document.getElementById('generateBtn');
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.imageUpload.addEventListener('change', this.handleImageUpload.bind(this));
        this.generateBtn.addEventListener('click', this.generateOutfit.bind(this));
    }

    async handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            
            // Show description box after successful upload
            document.querySelector('.description-section').style.display = 'block';
            this.personType = data.person_type;
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }

    async generateOutfit() {
        const description = this.descriptionBox.value;
        if (!description) return;

        const formData = new FormData();
        formData.append('image', this.imageUpload.files[0]);
        formData.append('description', description);
        formData.append('person_type', this.personType);

        try {
            const response = await fetch('/generate', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            this.displayResult(result.modified_image);
        } catch (error) {
            console.error('Error generating outfit:', error);
        }
    }

    displayResult(modifiedImage) {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `<img src="${modifiedImage}" alt="Generated outfit">`;
    }
}

new VirtualTryOn(); 