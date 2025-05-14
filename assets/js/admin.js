// Initialize Quill editor
const quill = new Quill('#editor', {
    theme: 'snow',
    placeholder: 'Write your blog content here...',
    modules: {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image']
        ]
    }
});

// Handle form submission
document.getElementById('blogForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').files[0];
    const content = quill.root.innerHTML;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('content', content);

    try {
        const response = await fetch('http://localhost:3000/api/blogs', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert('Blog published successfully!');
            document.getElementById('blogForm').reset();
            quill.setContents([]);
        } else {
            alert('Failed to publish blog.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while publishing the blog.');
    }
});