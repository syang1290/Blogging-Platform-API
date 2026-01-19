from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('blog.db')
    conn.row_factory = sqlite3.Row  
    return conn

@app.route('/posts', methods=['POST'])
def create_post():
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

if __name__ == '__main__':
    app.run(port=3000, debug=True)