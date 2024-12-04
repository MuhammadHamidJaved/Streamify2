import { Pagination } from 'react-bootstrap';

interface CustomPaginationProps {
    page: number; // Current page
    totalPages: number; // Total number of pages
    setPage: (page: number) => void; // Function to set the current page
}

const CustomPagination: React.FC<CustomPaginationProps> = ({ page, totalPages, setPage }) => {
    const displayedPages = 5; // Total number of pages to display
    const halfDisplayed = Math.floor(displayedPages / 2); // 2 before and 2 after

    // Calculate start and end page numbers
    let startPage = Math.max(page - halfDisplayed, 1);
    let endPage = Math.min(page + halfDisplayed, totalPages);

    // Adjust start page if end page is less than total displayed pages
    if (endPage - startPage < displayedPages - 1) {
        if (startPage === 1) {
            endPage = Math.min(startPage + displayedPages - 1, totalPages);
        } else {
            startPage = Math.max(endPage - displayedPages + 1, 1);
        }
    }

    return (
        <Pagination>
            <Pagination.First onClick={() => setPage(1)} />
            <Pagination.Prev onClick={() => setPage((prev) => Math.max(prev - 1, 1))} />
            {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                <Pagination.Item
                    key={startPage + index}
                    active={startPage + index === page}
                    onClick={() => setPage(startPage + index)}
                >
                    {startPage + index}
                </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} />
            <Pagination.Last onClick={() => setPage(totalPages)} />
        </Pagination>
    );
};

export default CustomPagination;
