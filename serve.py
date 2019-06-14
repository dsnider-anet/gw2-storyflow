from http.server import SimpleHTTPRequestHandler
from socketserver import TCPServer

SimpleHTTPRequestHandler.extensions_map = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/x-javascript',
    '': 'application/octet-stream',
}

TCPServer(("127.0.0.1", 8000), SimpleHTTPRequestHandler).serve_forever()
