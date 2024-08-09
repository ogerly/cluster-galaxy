from http.server import SimpleHTTPRequestHandler, HTTPServer

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'x-api-key, Content-Type')
        super().end_headers()

PORT = 8000

httpd = HTTPServer(('localhost', PORT), CORSRequestHandler)
print(f"Serving on port {PORT}")
httpd.serve_forever()
