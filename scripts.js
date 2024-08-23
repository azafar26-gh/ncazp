document.addEventListener('DOMContentLoaded', fetchReviews);

function fetchReviews() {
    fetch('http://52.228.27.47:5000/reviews')  // Replace <your-vm-ip> with the IP address of your VM
        .then(response => response.json())
        .then(data => {
            const reviewsDiv = document.getElementById('reviews');
            reviewsDiv.innerHTML = '';
            data.forEach(review => {
                const reviewElement = document.createElement('div');
                reviewElement.textContent = `${review.ReviewText} (Posted on: ${review.ReviewDate})`;
                reviewsDiv.appendChild(reviewElement);
            });
        });
}

function submitReview() {
    const reviewText = document.getElementById('review-text').value;
    fetch('http://<your-vm-ip>:5000/reviews', {  // Replace <your-vm-ip> with the IP address of your VM
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ReviewText: reviewText }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchReviews();  // Refresh the reviews list
        document.getElementById('review-text').value = '';  // Clear the input field
    });
}
