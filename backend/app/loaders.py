from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter


def load_pdf(file_path: str, *, split: bool = False) -> str:
    """
    Generic PDF loader used for:
    - Client requirement documents
    - Developer resumes

    Args:
        file_path: path to PDF file
        split: whether to chunk text (recommended for long client docs)

    Returns:
        Extracted text as a single string
    """

    loader = PyPDFLoader(file_path)
    pages = loader.load()

    # For short docs like resumes → no splitting needed
    if not split:
        return "\n".join(page.page_content for page in pages)

    # For long docs like requirements → split safely
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )

    chunks = splitter.split_documents(pages)
    return "\n\n".join(chunk.page_content for chunk in chunks)
