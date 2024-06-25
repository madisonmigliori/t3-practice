// import React, { useState } from "react";
// import {
//     Pagination,
//     PaginationContent,
//     PaginationEllipsis,
//     PaginationItem,
//     PaginationLink,
//     PaginationNext,
//     PaginationPrevious,
// } from "~/components/ui/pagination";

// export default function ListingPagination() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [postsPerPage, setPostsPerPage] = useState(10);

//   const lastPostIndex = currentPage * postsPerPage;
//   const firstPostIndex = lastPostIndex - postsPerPage;
//   const currentPosts = data.slice(firstPostIndex, lastPostIndex);

//   return (
//          <PagniationSection
//             totalPosts={listing.length}
//             postsPerPage={postsPerPage}
//             currentPage={currentPage}
//             setCurrentPage={setCurrentPage} />
//           );
//   }
//   function PagniationSection({
//     totalPosts,
//     postsPerPage,
//     currentPage,
//     setCurrentPage,
//   }: {
//     totalPosts: any;
//     postsPerPage: any;
//     currentPage: any;
//     setCurrentPage: any;
//   }) {

//   }
//   for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   const maxPageNum = 5; // Maximum page numbers to display at once
//   const pageNumLimit = Math.floor(maxPageNum / 2); // Current page should be in the middle if possible

//   let activePages = pageNumbers.slice(
//     Math.max(0, currentPage - 1 - pageNumLimit),
//     Math.min(currentPage - 1 + pageNumLimit + 1, pageNumbers.length)
//   );

//   const handleNextPage = () => {
//     if (currentPage < pageNumbers.length) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//       <Pagination>
//         <PaginationContent>
//           <PaginationItem>
//             <PaginationPrevious onClick={handlePrevPage} />
//           </PaginationItem>
//           <PaginationItem>
//            {renderPages()}
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationEllipsis />
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationNext onClick={handleNextPage} />
//           </PaginationItem>
//         </PaginationContent>
//       </Pagination>

//   );
// }
