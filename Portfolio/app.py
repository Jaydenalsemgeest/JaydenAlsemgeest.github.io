from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/projects")
def projects():
    return render_template("projects.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route("/darktech")
def darktech():
    return render_template("darktech.html")

@app.route("/dokkie")
def dokkie():
    return render_template("dokkie.html")

@app.route("/abnamro")
def abnamro():
    return render_template("abnamro.html")

@app.route("/gemeenteamsterdam")
def gemeenteamsterdam():
    return render_template("gemeenteamsterdam.html")

@app.route("/shapecheck")
def shapecheck():
    return render_template("shapecheck.html")

if __name__ == "__main__":
    app.run(debug=True)