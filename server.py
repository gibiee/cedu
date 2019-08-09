from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)
# app = Flask(__name__, static_folder="templates/css")

@app.route('/')
@app.route('/main.html')
def main() :
    return render_template('main.html')

@app.route('/editor.html')
def editor() :
    return render_template('editor.html')

@app.route('/question_list.html')
def question_list() :
    return redirect(url_for('main'))

if __name__ == '__main__':
    app.run()
