from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('blog.db')
    conn.row_factory = sqlite3.Row  
    return conn

@app.route('/posts', methods=['POST'])

def create_post():
    """
    This method handles the incoming POST request to create a new blog post and safely retrieves specific fields.
    Returns the created post as a JSON response.
    """

    data = request.get_json()
    
    title = data.get('title')
    content = data.get('content')
    category = data.get('category')
    tags = str(data.get('tags')) 

    if not title or not content:
        return jsonify({"error": "Title and content are required"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()  

    cursor.execute(
        'INSERT INTO posts (title, content, category, tags) VALUES (?, ?, ?, ?)',
        (title, content, category, tags)
    )
    conn.commit()
    new_id = cursor.lastrowid
    
    post = cursor.execute('SELECT * FROM posts WHERE id = ?', (new_id,)).fetchone()
    conn.close()

    return jsonify(dict(post)), 201

@app.route('/posts/<int:post_id>', methods=['PUT'])

def update_post(post_id):
    """
    Given new information from a json file, updates an existing blog post in the database identified by its post_id.
    Returns the updated post as a JSON response.
    """

    data = request.get_json()
    
    title = data.get('title')
    content = data.get('content')
    category = data.get('category')
    tags = str(data.get('tags')) 

    if not title or not content:
        return jsonify({"error": "Title and content are required"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    existing_post = cursor.execute('SELECT * FROM posts WHERE id = ?', (post_id,)).fetchone()

    if existing_post is None:
        conn.close()
        return jsonify({"error": "Blog post not found"}), 404

    cursor.execute(
        '''UPDATE posts 
           SET title = ?, content = ?, category = ?, tags = ?, updatedAt = CURRENT_TIMESTAMP 
           WHERE id = ?''',
        (title, content, category, tags, post_id)
    )
    
    conn.commit()
    
    updated_post = cursor.execute('SELECT * FROM posts WHERE id = ?', (post_id,)).fetchone()
    conn.close()

    return jsonify(dict(updated_post)), 200

@app.route('/posts/<int:post_id>', methods=['DELETE'])

def delete_post(post_id):
    """
    Deletes a post from the database by its post_id.
    """

    conn = get_db_connection()
    cursor = conn.cursor()

    existing_post = cursor.execute('SELECT * FROM posts WHERE id = ?', (post_id,)).fetchone()

    if existing_post is None:
        conn.close()
        return jsonify({"error": "Blog post not found"}), 404

    cursor.execute('DELETE FROM posts WHERE id = ?', (post_id,))
    conn.commit()
    conn.close()

    return jsonify({"message": "Blog post deleted successfully"}), 200

@app.route('/posts/<int:post_id>', methods=['GET'])

def get_post(post_id):
    """
    Retrieves a single blog post by its post_id.
    """

    conn = get_db_connection()
    post = conn.execute('SELECT * FROM posts WHERE id = ?', (post_id,)).fetchone()
    conn.close()

    if post is None:
        return jsonify({"error": "Blog post not found"}), 404

    return jsonify(dict(post)), 200


if __name__ == '__main__':
    app.run(port=3000, debug=True)