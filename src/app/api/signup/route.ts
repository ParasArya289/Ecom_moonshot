// @ts-nocheck 
import { Pool } from "@neondatabase/serverless"
const interests = [
    'Technology',
    'Science',
    'Arts',
    'Music',
    'Travel',
    'Sports',
    'Health',
    'Business',
    'Education',
    'Environment',
    'Politics',
    'History',
    'Food',
    'Fashion',
    'Gaming',
    'Photography',
    'Movies',
    'Books',
    'Finance',
    'Real Estate',
    'Investing',
    'Entrepreneurship',
    'Marketing',
    'Social Media',
    'Cooking',
    'Fitness',
    'Yoga',
    'Meditation',
    'Spirituality',
    'Nature',
    'Wildlife',
    'Space',
    'Astronomy',
    'AI',
    'Machine Learning',
    'Data Science',
    'Programming',
    'Web Development',
    'Mobile Development',
    'Cybersecurity',
    'Blockchain',
    'Cryptocurrency',
    'Virtual Reality',
    'Augmented Reality',
    '3D Printing',
    'Biotechnology',
    'Genetics',
    'Medical Research',
    'Neuroscience',
    'Psychology',
    'Sociology',
    'Anthropology',
    'Philosophy',
    'Literature',
    'Poetry',
    'Classical Music',
    'Jazz',
    'Rock Music',
    'Pop Music',
    'Hip-Hop',
    'Electronic Music',
    'Opera',
    'Ballet',
    'Theater',
    'Comedy',
    'Cartoons',
    'Anime',
    'Manga',
    'Graphic Novels',
    'Comics',
    'Painting',
    'Drawing',
    'Sculpture',
    'Architecture',
    'Interior Design',
    'Landscape Design',
    'Urban Planning',
    'Agriculture',
    'Horticulture',
    'Animal Care',
    'Veterinary Science',
    'Marine Biology',
    'Zoology',
    'Botany',
    'Geology',
    'Meteorology',
    'Climatology',
    'Renewable Energy',
    'Sustainable Living',
    'Green Technology',
    'Recycling',
    'Waste Management',
    'Public Speaking',
    'Leadership',
    'Project Management',
    'Human Resources',
    'Customer Service',
    'Sales',
    'E-commerce',
    'Supply Chain Management',
    'Logistics',
    'Transportation',
    'Aviation',
    'Automotive',
    'Railway',
    'Maritime'
  ];
export async function GET(req,res){
    const pool = new Pool({connectionString:process.env.DATABASE_URL})
    for (const interest of interests) {
        await pool.query(
          'INSERT INTO categories (name) VALUES ($1) ON CONFLICT (name) DO NOTHING',
          [interest]
        );
        console.log('seeded',interest)
      }
    // const {rows} = await pool.query(sql);
    // const now = rows[0];
    pool.end(); 
    return Response.json({message:'done'},{status:200})
}
// export async function GET(req,res){
//     const pool = new Pool({connectionString:process.env.DATABASE_URL})
//     const sql = `SELECT NOW();`
//     const {rows} = await pool.query(sql);
//     const now = rows[0];
//     pool.end(); 
//     return Response.json({now},{status:200})
// }