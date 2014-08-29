import os
import urllib
import datetime

from google.appengine.api import users
from google.appengine.ext import ndb

import jinja2
import webapp2
import logging


JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class MainHandler(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('templates/main.html')
        self.response.write(template.render())

class MoviewViewHandler(webapp2.RequestHandler):
    def get(self,id):
    	values = { "id" : id }
        template = JINJA_ENVIRONMENT.get_template('templates/viewspecific.html')
        self.response.write(template.render(values))        


application = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/movie/(.*)', MoviewViewHandler),
], debug=True)