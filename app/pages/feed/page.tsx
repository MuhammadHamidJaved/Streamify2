'use client';
import React from 'react';
import PostFeed from '@/components/Feed/PostFeed';
import '@/styles/feed.css';
import { Container, Row, Col } from 'react-bootstrap'; // Import Bootstrap components
import { fetchGenres } from '@/services/tmdbApi';
import { Genre } from '@/types/Genre';
import Link from 'next/link';

const FeedPage: React.FC = () => {
    const [genres, setGenres] = React.useState<Genre[]>([]);

    React.useEffect(() => {
        const getGenres = async () => {
            const genresData = await fetchGenres();
            setGenres(genresData);
        };
        getGenres();
    }, []);

    return (
        <Container fluid className='overflow-hidden'>
            <h1 className="text-center my-4">Interact with the community</h1>
            <p className="text-center mb-4">Share your thoughts with the community</p>
            <Row className="justify-content-center"
                style={{ overflow: 'hidden' }}
            >
                {/* Genre and other details on large screens */}
                <Col xs={12} md={3} lg={2} className="d-none d-lg-block">
                    <div className="genre-box">
                        <h3>Genres</h3>
                        <ul className="list-unstyled">
                            {genres.map((genre) => (
                                <li key={genre.id}>
                                    <Link href={`/pages/genre/${genre.id}` }
                                    className='text-decoration-none text-dark'
                                >{genre.name}</Link>
                                </li>

                               
                            ))}
                        </ul>
                        
                    </div>
                </Col>
                
                {/* Main feed in the middle */}
                <Col xs={12} md={6} lg={6} className="feed-column overflow-auto"
                style={{ maxHeight: '80vh' }}
                >
                    <PostFeed />
                </Col>

                {/* Genre and other details on large screens */}
                <Col xs={12} md={3} lg={2} className="d-none d-lg-block ">
                    <div className="genre-box">
                        <h5>Category</h5>
                        <ul className="list-unstyled">
                            <li>
                                <Link href="/pages/category/top-rated" className='text-decoration-none text-dark'>Top Rated</Link>
                            </li>
                            <li>
                                <Link href="/pages/category/popular" className='text-decoration-none text-dark'>Popular</Link>
                            </li>
                            <li>
                                <Link href="/pages/category/latest" className='text-decoration-none text-dark'>Latest</Link>
                            </li>
                            <li>
                                <Link href="/pages/category/trending" className='text-decoration-none text-dark'>Trending</Link>
                            </li>
                            <li>
                                <Link href="/pages/category/upcoming" className='text-decoration-none text-dark'>Upcoming</Link>
                            </li>
                            <li>
                                <Link href="/pages/category/now-playing" className='text-decoration-none text-dark'>Now Playing</Link>
                            </li>
                            <li>
                                <Link href="/pages/category/airing-today" className='text-decoration-none text-dark'>Airing Today</Link>
                            </li>


                        </ul>

                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default FeedPage;
