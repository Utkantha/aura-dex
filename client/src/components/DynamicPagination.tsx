import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Pagination as ShadPagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export default function DynamicPagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
    const MAX_VISIBLE_PAGES = 5;

    const generatePages = () => {
        const pages = [];

        if (totalPages <= MAX_VISIBLE_PAGES) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, "...", totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
            }
        }

        return pages;
    };

    return (
        <ShadPagination className="justify-center mt-4">
            <PaginationContent className="gap-1">
                <PaginationItem>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                </PaginationItem>

                {generatePages().map((page, index) => (
                    <PaginationItem key={index}>
                        {page === "..." ? (
                            <span className="px-2 text-muted-foreground">...</span>
                        ) : (
                            <Button
                                variant={page === currentPage ? "default" : "outline"}
                                size="icon"
                                onClick={() => onPageChange(Number(page))}
                            >
                                {page}
                            </Button>
                        )}
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </ShadPagination>
    );
}
