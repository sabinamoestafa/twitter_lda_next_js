"use client";
// app/admin/page.tsx
"use client";
import { supabase } from "../lib/supabaseClient";
import { HiArrowSmallUp, HiArrowLongDown } from "react-icons/hi2";
import { LineChart } from "@mui/x-charts";
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

// const SUPABASE_URL = "https://riapbavbospmdsbiwnew.supabase.co";
// const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpYXBiYXZib3NwbWRzYml3bmV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxMjQwNzQsImV4cCI6MjA1MjcwMDA3NH0.fqq4DOPwFkSdIGgI-jv_DQLT4MYWe4M6IfwAQSfWpOg";

// export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const Page = () => {
  const [totalTweets, setTotalTweets] = useState(0);
  const [uniqueUsers, setUniqueUsers] = useState(0);
  const [avgTweetLength, setAvgTweetLength] = useState(0);
  const [recentUsers, setRecentUsers] = useState<string[]>([]);
  const [recentDescriptions, setRecentDescriptions] = useState<{ username: string, description: string }[]>([]);
  const [monthlyAvgTweetLength, setMonthlyAvgTweetLength] = useState<{ month: number, avgLength: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('twitter_data')
        .select('id_str, user_id_str, description, username, created_at');

      if (error) {
        console.error('Error fetching data:', error);
        return;
      }

      if (data) {
        // Total Tweets: Total jumlah username unik
        const uniqueUsernames = new Set(data.map(item => item.username));
        setTotalTweets(uniqueUsernames.size);

        // Avg Tweet Length: Total jumlah karakter dari semua deskripsi
        const totalDescriptionLength = data.reduce((acc, item) => acc + (item.description ? item.description.length : 0), 0);
        setAvgTweetLength(totalDescriptionLength);

        // Unique Users: Jumlah pengguna unik berdasarkan user_id_str
        const uniqueUserIds = new Set(data.map(item => item.user_id_str));
        setUniqueUsers(uniqueUserIds.size);

        // Limit to 5 recent users
        setRecentUsers(data.slice(0, 5).map(item => item.username));

        // Limit to 5 recent descriptions
        setRecentDescriptions(data.slice(0, 5).map(item => ({
          username: item.username,
          description: item.description ? item.description.slice(0, 50) : '' // Limit description to 50 characters
        })));

        // Calculate monthly average tweet length
        const monthlyData = Array(12).fill(0).map((_, index) => ({ month: index + 1, totalLength: 0, count: 0 }));
        
        data.forEach(item => {
          const date = new Date(item.created_at);
          const month = date.getMonth(); // 0-11
          if (item.description) {
            monthlyData[month].totalLength += item.description.length;
            monthlyData[month].count += 1;
          }
        });

        const avgMonthlyData = monthlyData.map(item => ({
          month: item.month,
          avgLength: item.count > 0 ? item.totalLength / item.count : 0
        }));

        setMonthlyAvgTweetLength(avgMonthlyData);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <div className="flex items-center">
        {/* Total Tweets Section */}
        <div className="h-[250px] w-[350px] shadow-md ml-10">
          <span className="flex font-semibold items-center justify-center text-xl cursor-pointer mt-10 text-[#555]">
            Total Tweets
          </span>
          <div className="flex items-center justify-center mt-3">
            <span className="font-semibold">{totalTweets}</span>
          </div>
          <div>
            <div className="flex items-center justify-center mt-3">
              <HiArrowSmallUp className="text-3xl text-green-700" />
              <HiArrowLongDown className="text-3xl text-red-700" />
            </div>
          </div>
        </div>

        {/* Unique Users Section */}
        <div className="h-[250px] w-[350px] shadow-md ml-10">
          <span className="flex font-semibold items-center justify-center text-xl cursor-pointer mt-10 text-[#555]">
            Unique Users
          </span>
          <div className="flex items-center justify-center mt-3">
            <span className="font-semibold">{uniqueUsers}</span>
          </div>
          <div>
            <div className="flex items-center justify-center mt-3">
              <HiArrowSmallUp className="text-3xl text-green-700" />
              <HiArrowLongDown className="text-3xl text-red-700" />
            </div>
          </div>
        </div>

        {/* Average Tweet Length Section */}
        <div className="h-[250px] font-semibold w-[350px] shadow-md ml-10">
          <span className="flex items-center justify-center text-xl cursor-pointer mt-10 text-[#555]">
            Avg Tweet Length
          </span>
          <div className="flex items-center justify-center mt-3">
            <span className="font-semibold">{avgTweetLength} characters</span>
          </div>
          <div>
            <div className="flex items-center justify-center mt-3">
              <HiArrowSmallUp className="text-3xl text-green-700" />
              <HiArrowLongDown className="text-3xl text-red-700" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center shadow-md m-10">
        {/* Line Chart Section */}
        <LineChart
          className="flex w-full"
          xAxis={[{ data: monthlyAvgTweetLength.map(item => item.month) }]}
          series={[
            {
              data: monthlyAvgTweetLength.map(item => item.avgLength),
            },
          ]}
          width={500}
          height={300}
        />

        {/* Pie Chart Section */}
        {/* <PieChart
          series={[
            {
              data: [
                { id: 0, value: 10, label: "series A" },
                { id: 1, value: 15, label: "series B" },
                { id: 2, value: 20, label: "series C" },
              ],
            },
          ]}
          width={400}
          height={200}
        /> */}
        
      </div>

      <div className="flex items-center">
        {/* Recent Users Section */}
        <div className="h-[400px] w-[500px] shadow-xl m-5">
          <h3 className="pl-10 font-semibold text-xl">Recent Users</h3>
          <ul className="space-y-10 p-10">
            {recentUsers.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
        </div>

        {/* Recent Descriptions Section */}
        <div className="h-[400px] w-[500px] shadow-xl m-5">
          <h3 className="pl-10 font-semibold text-xl">Recent Descriptions</h3>
          <ul className="space-y-10 p-10">
            {recentDescriptions.map((item, index) => (
              <li key={index}>{item.username}: {item.description}</li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Page;
