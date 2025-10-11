// Este arquivo centraliza os estilos e templates HTML para a aplicação.

const styles = `
<style>
    body { 
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; 
        text-align: center; 
        margin-top: 50px; 
        background-color: #f6f8fa; 
    }
    h1 { color: #24292e; }
    p { color: #586069; }
    .container { 
        max-width: 600px; 
        margin: auto; 
        padding: 30px; 
        background-color: #fff;
        border: 1px solid #e1e4e8;
        border-radius: 6px;
    }
    .links a { 
        display: inline-block; 
        margin: 10px; 
        padding: 12px 24px; 
        background-color: #0366d6; 
        color: white; 
        text-decoration: none; 
        border-radius: 6px; 
        font-weight: 600; 
        transition: background-color 0.2s;
    }
    .links a:hover { 
        background-color: #005cc5; 
    }
    .home-link {
        background-color: #28a745;
    }
    .home-link:hover {
        background-color: #218838;
    }
</style>
`;

module.exports = { styles };