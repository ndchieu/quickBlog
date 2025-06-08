import React, { useState } from 'react';
import { motion } from 'framer-motion'; // dùng framer-motion chuẩn
import { blogCategories } from '../assets/assets';
import BlogCard from './BlogCard';
import { useAppContext } from '../../context/AppContext';

const BlogList = () => {
    const [menu, setMenu] = useState('All');
    const { blogs, input } = useAppContext();

    const filteredBlogs = () => {
        if (input === '') {
            return blogs
        }
        return blogs.filter((blog) => blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase()));

    };

    return (
        <div>
            {/* Category Tabs */}
            <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
                {blogCategories.map(item => {
                    const isActive = menu === item;
                    return (
                        <div key={item} className="relative">
                            <button
                                onClick={() => setMenu(item)}
                                className={`relative z-10 px-4 py-1 rounded-full transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-500'
                                    }`}
                            >
                                {item}
                                {isActive && (
                                    <motion.div
                                        layoutId="underline"
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                        className="absolute inset-0 bg-primary rounded-full -z-10"
                                    />
                                )}
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Blog Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
                {filteredBlogs()
                    .filter((blog) => menu === 'All' ? true : blog.category.toLowerCase() === menu.toLowerCase())
                    .map((blog) => <BlogCard key={blog._id} blog={blog} />)}
            </div>
        </div>
    );
};

export default BlogList;
