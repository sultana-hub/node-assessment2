// import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   Grid,
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   CardMedia,
//   Button,
//   CircularProgress
// } from '@mui/material';
// import { useQuery } from '@tanstack/react-query';
// import { getAllProducts, searchProduct } from '../components/QueryFunction/CrudProducts';
// import { useNavigate } from 'react-router-dom';
// import SearchForm from '../components/SearchForm';
// import SideBar from './SideBar'; //  Sidebar included here

// const MainPage = () => {
//   const navigate = useNavigate();

//   //  State for category filters
//   const [filters, setFilters] = useState({ category: [] });

//   //  Search state
//   const [keyword, setKeyword] = useState('');
//   const [shouldSearch, setShouldSearch] = useState(false);

//   //  All products (with category populated)
//   const { data: allData, isLoading, isError } = useQuery({
//     queryKey: ['products'],
//     queryFn: getAllProducts,
//   });

//   //  Searched products
//   const { data: searchData, refetch: refetchSearch } = useQuery({
//     queryKey: ['searchProducts', keyword],
//     queryFn: () => searchProduct(keyword),
//     enabled: false
//   });

//   useEffect(() => {
//     if (shouldSearch && keyword.trim()) {
//       refetchSearch();
//       setShouldSearch(false);
//     }
//   }, [keyword, shouldSearch]);

//   const handleSearch = (term) => {
//     if (!term.trim()) return;
//     setKeyword(term);
//     setShouldSearch(true);
//   };

//   const handleDetails = (id) => navigate(`details/${id}`);

//   const allProducts = allData?.data || [];
//   const searchedProducts = searchData?.data || [];
//   const productsToShow = keyword ? searchedProducts : allProducts;

//   //  Apply category filtering
//   const filteredByCategory =
//     filters?.category?.length > 0
//       ? productsToShow.filter((p) => filters.category.includes(p.category?.name))
//       : productsToShow;

//   //  Loading and error UI
//   if (isLoading) {
//     return (
//       <Container sx={{ textAlign: 'center', mt: 6 }}>
//         <CircularProgress />
//       </Container>
//     );
//   }

//   if (isError) {
//     return (
//       <Container sx={{ textAlign: 'center', mt: 6 }}>
//         <Typography variant="h6" color="error">
//           Failed to load products.
//         </Typography>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       {/*  Search */}
//       <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
//         <SearchForm onSearch={handleSearch} />
//       </Box>

//       {/*  Sidebar and Products Layout */}
//       <Box sx={{ display: 'flex', gap: 4 }}>
//         {/* Sidebar */}
//         <Box sx={{ width: 250 }}>
//           <SideBar onFilterChange={setFilters} />
//         </Box>

//         {/* Product Grid */}
//         <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ flex: 1 }}>
//           {filteredByCategory.length ? (
//             filteredByCategory.map((item) => (
//               <Grid item xs={4} sm={4} md={4} key={item._id}>
//                 <Card
//                   sx={{
//                     height: '100%',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'space-between',
//                   }}
//                 >
//                   <CardMedia
//                     component="img"
//                     height="200"
//                     src={`http://localhost:3000/${item.image?.replace(/\\/g, '/')}`}
//                     alt="Product"
//                   />
//                   <CardContent>
//                     <Typography variant="h6" noWrap>
//                       {item.name}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" noWrap>
//                       {item.description}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Category: {item.category?.name}
//                     </Typography>
//                   </CardContent>
//                   <Box sx={{ p: 2, textAlign: 'center' }}>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       size="small"
//                       onClick={() => handleDetails(item._id)}
//                     >
//                       View Details
//                     </Button>
//                   </Box>
//                 </Card>
//               </Grid>
//             ))
//           ) : (
//             <Grid item xs={12}>
//               <Typography variant="h6" align="center">
//                 No products found.
//               </Typography>
//             </Grid>
//           )}
//         </Grid>
//       </Box>
//     </Container>
//   );
// };

// export default MainPage;





import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts, searchProduct } from '../components/QueryFunction/CrudProducts';
import { useNavigate } from 'react-router-dom';
import SearchForm from '../components/SearchForm';
import SideBar from './SideBar';

const MainPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ category: [] });
  const [keyword, setKeyword] = useState('');
  const [shouldSearch, setShouldSearch] = useState(false);

  const { data: allData, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });

  const { data: searchData, refetch: refetchSearch } = useQuery({
    queryKey: ['searchProducts', keyword],
    queryFn: () => searchProduct(keyword),
    enabled: false,
  });

  useEffect(() => {
    if (shouldSearch && keyword.trim()) {
      refetchSearch();
      setShouldSearch(false);
    }
  }, [keyword, shouldSearch]);

  const handleSearch = (term) => {
    if (!term.trim()) return;
    setKeyword(term);
    setShouldSearch(true);
  };

  const handleDetails = (id) => navigate(`details/${id}`);

  const allProducts = allData?.data || [];
  const searchedProducts = searchData?.data || [];
  const productsToShow = keyword ? searchedProducts : allProducts;

  const filteredByCategory =
    filters?.category?.length > 0
      ? productsToShow.filter((p) => filters.category.includes(p.category?.name))
      : productsToShow;

  if (isLoading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 6 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container sx={{ textAlign: 'center', mt: 6 }}>
        <Typography variant="h6" color="error">
          Failed to load products.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Search Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <SearchForm onSearch={handleSearch} />
      </Box>

      {/* Layout with Sidebar and Products */}
      <Box sx={{ display: 'flex', gap: 5 }}>
        {/* Sidebar - Leftmost */}
        <Box sx={{ width: '250px', flexShrink: 0 }}>
          <SideBar onFilterChange={setFilters} />
        </Box>

        {/* Product Grid */}
        <Grid container spacing={3} sx={{ flex: 1 }}>
          {filteredByCategory.length > 0 ? (
            filteredByCategory.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: 3,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={`http://localhost:3000/${item.image?.replace(/\\/g, '/')}`}
                    alt={item.name}
                  />
                  <CardContent>
                    <Typography variant="h6" noWrap>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {item.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Category: {item.category?.name}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleDetails(item._id)}
                    >
                      View Details
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6" align="center">
                No products found.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default MainPage;

