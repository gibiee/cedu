from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)
# app = Flask(__name__, static_folder="templates/css")

@app.route('/')
@app.route('/main.html')
def main() :
    return render_template('main.html')

@app.route('/home.html')
def home() :
    return render_template('home.html')

@app.route('/editor.html')
def editor() :
    return render_template('editor.html')

@app.route('/question_list.html')
def question_list() :
    return render_template('question_list.html')

@app.route('/question.html')
def question() :
    return render_template('question.html')

@app.route('/marking.html')
def marking() :
    return render_template('marking.html')

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000)
