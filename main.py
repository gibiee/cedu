from flask import Flask, render_template
from google.cloud import datastore

datastore_client = datastore.Client()

app = Flask(__name__)


@app.route('/')
@app.route('/main.html')
def main():
    return render_template('main.html')


@app.route('/home.html')
def home():
    return render_template('home.html')


@app.route('/editor.html')
def editor():
    return render_template('editor.html')


@app.route('/question_list.html')
def question_list():
    question_list = fetch_question_list(10)
    return render_template('question_list.html', question_list=question_list)


@app.route('/question/<int:num>')
def question(num=None):
    question, marking_data = fetch_question(num)
    return render_template('question.html', question=question, marking_data=marking_data)


@app.route('/marking.html')
def marking():
    return render_template('marking.html')


def fetch_question_list(limit):
    query = datastore_client.query(kind='question_list')
    query.order = ['문제번호']

    question_list = query.fetch(limit=limit)
    return question_list


def fetch_question(num):
    query = datastore_client.query(kind='question')
    query.add_filter('문제번호', '=', num)
    question = list(query.fetch())

    query = datastore_client.query(kind='question_data')
    query.add_filter('문제번호', '=', num)
    marking_data = list(query.fetch())
    return question, marking_data


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
