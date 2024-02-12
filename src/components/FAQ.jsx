import React, { useState, useEffect } from "react";

const FAQ = () => {
  const [faqData, setFaqData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  const API = "https://jsonplaceholder.typicode.com/posts";

  const getData = async (API) => {
    try {
      const response = await fetch(API);
      const data = await response.json();
      setFaqData(data);
      setFilteredFaqs(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData(API);
  }, []);

  useEffect(() => {
    const filtered = faqData.filter((faq) =>
      faq.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFaqs(filtered);
  }, [searchTerm, faqData]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "auto",
        padding: "20px",
        background: "black",
      }}
    >
      <h2 style={{ textAlign: "center", color: "white" }}>
        Frequently Asked Questions
      </h2>
      <input
        type="text"
        placeholder="Search FAQs"
        value={searchTerm}
        onChange={handleSearch}
        style={{
          width: "96.5%",
          padding: "8px",
          marginBottom: "20px",
        }}
      />
      {filteredFaqs.map((faq, index) => (
        <div
          key={faq.id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "10px",
            borderRadius: "5px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#f2f2f2",
              padding: "10px",
              cursor: "pointer",
            }}
            onClick={() => toggleAccordion(index)}
          >
            <h3 style={{ margin: "0" }}>{faq.title}</h3>
            <span>{openIndex === index ? "▲" : "▼"}</span>
          </div>
          {openIndex === index && (
            <div style={{ padding: "10px", color: "gray" }}>
              <p>{faq.body}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
