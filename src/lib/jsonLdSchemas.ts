export const jsonLdSchemas = {
  "/": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://camzcleaning.com/#business",
        "name": "Camz Cleaning",
        "url": "https://camzcleaning.com/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://camzcleaning.com/wp-admin/uploads/footer-logo.webp"
        },
        "image": "https://camzcleaning.com/wp-admin/uploads/footer-logo.webp",
        "telephone": "+1-587-837-1977",
        "email": "info@camzcleaning.com",
        "description": "Trusted residential, commercial, vehicle and seasonal cleaning across Calgary, Airdrie, Cochrane and Chestermere. Book Camz Cleaning.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Calgary",
          "addressRegion": "AB",
          "addressCountry": "CA"
        },
        "areaServed": [
          {
            "@type": "City",
            "name": "Calgary",
            "containedInPlace": {
              "@type": "AdministrativeArea",
              "name": "Alberta"
            }
          },
          {
            "@type": "City",
            "name": "Airdrie",
            "containedInPlace": {
              "@type": "AdministrativeArea",
              "name": "Alberta"
            }
          },
          {
            "@type": "City",
            "name": "Cochrane",
            "containedInPlace": {
              "@type": "AdministrativeArea",
              "name": "Alberta"
            }
          },
          {
            "@type": "City",
            "name": "Chestermere",
            "containedInPlace": {
              "@type": "AdministrativeArea",
              "name": "Alberta"
            }
          }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Cleaning services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Commercial cleaning and janitorial services"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Residential cleaning"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Vehicle cleaning and detailing"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Seasonal property and vacation-rental cleaning"
              }
            }
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://camzcleaning.com/#website",
        "url": "https://camzcleaning.com/",
        "name": "Camz Cleaning",
        "publisher": {
          "@id": "https://camzcleaning.com/#business"
        },
        "inLanguage": "en-CA"
      },
      {
        "@type": "WebPage",
        "@id": "https://camzcleaning.com/#webpage",
        "url": "https://camzcleaning.com/",
        "name": "Trusted Cleaning Services in Calgary & across Alberta",
        "description": "Trusted residential, commercial, vehicle and seasonal cleaning across Calgary, Airdrie, Cochrane and Chestermere. Book Camz Cleaning.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://camzcleaning.com/#website",
          "url": "https://camzcleaning.com/",
          "name": "Camz Cleaning"
        },
        "about": {
          "@type": "LocalBusiness",
          "@id": "https://camzcleaning.com/#business",
          "name": "Camz Cleaning",
          "url": "https://camzcleaning.com/"
        },
        "inLanguage": "en-CA"
      }
    ]
  },
  "/about-us/": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": "https://camzcleaning.com/about-us/#webpage",
        "url": "https://camzcleaning.com/about-us/",
        "name": "About Camz Cleaning | Cleaning Company",
        "description": "Learn about Camz Cleaning, our local team, service standards and approach to reliable residential and commercial cleaning in the Calgary area.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://camzcleaning.com/#website",
          "url": "https://camzcleaning.com/",
          "name": "Camz Cleaning"
        },
        "about": {
          "@type": "LocalBusiness",
          "@id": "https://camzcleaning.com/#business",
          "name": "Camz Cleaning",
          "url": "https://camzcleaning.com/"
        },
        "inLanguage": "en-CA",
        "mainEntity": {
          "@type": "LocalBusiness",
          "@id": "https://camzcleaning.com/#business",
          "name": "Camz Cleaning",
          "url": "https://camzcleaning.com/",
          "telephone": "+1-587-837-1977",
          "email": "info@camzcleaning.com"
        }
      }
    ]
  },
  "/services/": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://camzcleaning.com/services/#webpage",
        "url": "https://camzcleaning.com/services/",
        "name": "Cleaning Services in Calgary | Camz Cleaning",
        "description": "Explore residential, commercial, vehicle and seasonal property cleaning services available across Calgary and nearby communities.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://camzcleaning.com/#website",
          "url": "https://camzcleaning.com/",
          "name": "Camz Cleaning"
        },
        "about": {
          "@type": "LocalBusiness",
          "@id": "https://camzcleaning.com/#business",
          "name": "Camz Cleaning",
          "url": "https://camzcleaning.com/"
        },
        "inLanguage": "en-CA",
        "mainEntity": {
          "@id": "https://camzcleaning.com/services/#services"
        }
      },
      {
        "@type": "ItemList",
        "@id": "https://camzcleaning.com/services/#services",
        "name": "Camz Cleaning Services",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Commercial Cleaning",
            "url": "https://camzcleaning.com/commercial-cleaning-services/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Residential Cleaning",
            "url": "https://camzcleaning.com/residential-cleaning-services/"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Vehicle Cleaning",
            "url": "https://camzcleaning.com/vehicle-cleaning-service/"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Seasonal Property Service",
            "url": "https://camzcleaning.com/seasonal-property-service/"
          }
        ]
      }
    ]
  },
  "/commercial-cleaning-services/": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://camzcleaning.com/commercial-cleaning-services/#webpage",
        "url": "https://camzcleaning.com/commercial-cleaning-services/",
        "name": "Commercial Cleaning & Janitorial Services in Calgary",
        "description": "Keep offices, restaurants and commercial facilities clean with flexible commercial cleaning services in Calgary and surrounding communities.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://camzcleaning.com/#website",
          "url": "https://camzcleaning.com/",
          "name": "Camz Cleaning"
        },
        "about": {
          "@type": "LocalBusiness",
          "@id": "https://camzcleaning.com/#business",
          "name": "Camz Cleaning",
          "url": "https://camzcleaning.com/"
        },
        "inLanguage": "en-CA",
        "mainEntity": {
          "@id": "https://camzcleaning.com/commercial-cleaning-services/#service"
        }
      },
      {
        "@type": "Service",
        "@id": "https://camzcleaning.com/commercial-cleaning-services/#service",
        "name": "Commercial Cleaning & Janitorial Services in Calgary",
        "serviceType": "Commercial cleaning and janitorial services",
        "description": "Keep offices, restaurants and commercial facilities clean with flexible commercial cleaning services in Calgary and surrounding communities.",
        "url": "https://camzcleaning.com/commercial-cleaning-services/",
        "provider": {
          "@type": "LocalBusiness",
          "@id": "https://camzcleaning.com/#business",
          "name": "Camz Cleaning",
          "url": "https://camzcleaning.com/",
          "telephone": "+1-587-837-1977",
          "email": "info@camzcleaning.com"
        },
        "areaServed": [
          {
            "@type": "City",
            "name": "Calgary",
            "containedInPlace": {
              "@type": "AdministrativeArea",
              "name": "Alberta"
            }
          },
          {
            "@type": "City",
            "name": "Airdrie",
            "containedInPlace": {
              "@type": "AdministrativeArea",
              "name": "Alberta"
            }
          },
          {
            "@type": "City",
            "name": "Cochrane",
            "containedInPlace": {
              "@type": "AdministrativeArea",
              "name": "Alberta"
            }
          },
          {
            "@type": "City",
            "name": "Chestermere",
            "containedInPlace": {
              "@type": "AdministrativeArea",
              "name": "Alberta"
            }
          }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Commercial cleaning and janitorial services options",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Commercial office and business cleaning"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Cleaning and sanitization"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Tile and floor cleaning"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Window cleaning"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Post-construction cleaning"
              }
            }
          ]
        }
      }
    ]
  },
  "/residential-cleaning-services/": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://camzcleaning.com/residential-cleaning-services/#webpage",
        "url": "https://camzcleaning.com/residential-cleaning-services/",
        "name": "Professional Residential Cleaning Services in Calgary",
        "description": "Book reliable residential cleaning in Calgary, Airdrie, Cochrane or Chestermere for regular, deep and move-in or move-out cleaning needs.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://camzcleaning.com/#website",
          "url": "https://camzcleaning.com/",
          "name": "Camz Cleaning"
        },
        "about": {
          "@type": "LocalBusiness",
          "@id": "https://camzcleaning.com/#business",
          "name": "Camz Cleaning",
          "url": "https://camzcleaning.com/"
        },
        "inLanguage": "en-CA",
        "mainEntity": {
          "@id": "https://camzcleaning.com/residential-cleaning-services/#service"
        }
      },
      {
        "@type": "Service",
        "@id": "https://camzcleaning.com/residential-cleaning-services/#service",
        "name": "Professional Residential Cleaning Services in Calgary",
        "serviceType": "Residential and house cleaning",
        "description": "Book reliable residential cleaning in Calgary, Airdrie, Cochrane or Chestermere for regular, deep and move-in or move-out cleaning needs.",
        "url": "https://camzcleaning.com/residential-cleaning-services/",
        "provider": {
          "@type": "LocalBusiness",
          "@id": "https://camzcleaning.com/#business",
          "name": "Camz Cleaning",
          "url": "https://camzcleaning.com/",
          "telephone": "+1-587-837-1977",
          "email": "info@camzcleaning.com"
        },
        "areaServed": [
          {
            "@type": "City",
            "name": "Calgary",
            "containedInPlace": {
              "@type": "AdministrativeArea",
              "name": "Alberta"
            }
          },
          {
            "@type": "City",
            "name": "Airdrie",
            "containedInPlace": {
              "@type": "AdministrativeArea",
              "name": "Alberta"
            }
          },
          {
            "@type": "City",
            "name": "Cochrane",
            "containedInPlace": {
              "@type": "AdministrativeArea",
              "name": "Alberta"
            }
          },
          {
            "@type": "City",
            "name": "Chestermere",
            "containedInPlace": {
              "@type": "AdministrativeArea",
              "name": "Alberta"
            }
          }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Residential and house cleaning options",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Regular home cleaning"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Deep cleaning"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Move-in and move-out cleaning"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Kitchen cleaning and sanitization"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Bathroom cleaning"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Floor and carpet cleaning"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Cabinet and appliance detailing"
              }
            }
          ]
        }
      }
    ]
  },
  "/vehicle-cleaning-service/": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://camzcleaning.com/vehicle-cleaning-service/#webpage",
        "url": "https://camzcleaning.com/vehicle-cleaning-service/",
        "name": "Expert Vehicle Cleaning & Detailing Calgary",
        "description": "Refresh your vehicle with interior and exterior cleaning, vacuuming, carpet and seat care, and detailing services in the Calgary area.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://camzcleaning.com/#website",
          "url": "https://camzcleaning.com/",
          "name": "Camz Cleaning"
        },
        "about": {
          "@type": "LocalBusiness",
          "@id": "https://camzcleaning.com/#business",
          "name": "Camz Cleaning",
          "url": "https://camzcleaning.com/"
        },
        "inLanguage": "en-CA",
        "mainEntity": {
          "@id": "https://camzcleaning.com/vehicle-cleaning-service/#service"
        }
      },
      {
        "@type": "Service",
        "@id": "https://camzcleaning.com/vehicle-cleaning-service/#service",
        "name": "Expert Vehicle Cleaning & Detailing Calgary",
        "serviceType": "Vehicle cleaning and car detailing",
        "description": "Refresh your vehicle with interior and exterior cleaning, vacuuming, carpet and seat care, and detailing services in the Calgary area.",
        "url": "https://camzcleaning.com/vehicle-cleaning-service/",
        "provider": {
          "@type": "LocalBusiness",
          "@id": "https://camzcleaning.com/#business",
          "name": "Camz Cleaning",
          "url": "https://camzcleaning.com/",
          "telephone": "+1-587-837-1977",
          "email": "info@camzcleaning.com"
        },
        "areaServed": [
          {
            "@type": "City",
            "name": "Calgary",
            "containedInPlace": {
              "@type": "AdministrativeArea",
              "name": "Alberta"
            }
          },
          {
            "@type": "City",
            "name": "Airdrie",
            "containedInPlace": {
              "@type": "AdministrativeArea",
              "name": "Alberta"
            }
          },
          {
            "@type": "City",
            "name": "Cochrane",
            "containedInPlace": {
              "@type": "AdministrativeArea",
              "name": "Alberta"
            }
          },
          {
            "@type": "City",
            "name": "Chestermere",
            "containedInPlace": {
              "@type": "AdministrativeArea",
              "name": "Alberta"
            }
          }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Vehicle cleaning and car detailing options",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Exterior wash and hand drying"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Interior vacuuming and dusting"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Dashboard and console cleaning"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Seat and carpet cleaning"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Interior and exterior window cleaning"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Wheel and tire cleaning"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Brake-dust and road-grime removal"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Tire shine application"
              }
            }
          ]
        }
      }
    ]
  },
  "/seasonal-property-service/": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://camzcleaning.com/seasonal-property-service/#webpage",
        "url": "https://camzcleaning.com/seasonal-property-service/",
        "name": "Seasonal Property Cleaning & Care in Calgary",
        "description": "Get dependable seasonal property and vacation-rental cleaning & care across Calgary, Airdrie, Cochrane and Chestermere. Request your service today.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://camzcleaning.com/#website",
          "url": "https://camzcleaning.com/",
          "name": "Camz Cleaning"
        },
        "about": {
          "@type": "LocalBusiness",
          "@id": "https://camzcleaning.com/#business",
          "name": "Camz Cleaning",
          "url": "https://camzcleaning.com/"
        },
        "inLanguage": "en-CA",
        "mainEntity": {
          "@id": "https://camzcleaning.com/seasonal-property-service/#service"
        }
      },
      {
        "@type": "Service",
        "@id": "https://camzcleaning.com/seasonal-property-service/#service",
        "name": "Seasonal Property Cleaning & Care in Calgary",
        "serviceType": "Seasonal property and vacation-rental cleaning",
        "description": "Get dependable seasonal property and vacation-rental cleaning & care across Calgary, Airdrie, Cochrane and Chestermere. Request your service today.",
        "url": "https://camzcleaning.com/seasonal-property-service/",
        "provider": {
          "@type": "LocalBusiness",
          "@id": "https://camzcleaning.com/#business",
          "name": "Camz Cleaning",
          "url": "https://camzcleaning.com/",
          "telephone": "+1-587-837-1977",
          "email": "info@camzcleaning.com"
        },
        "areaServed": [
          {
            "@type": "City",
            "name": "Calgary",
            "containedInPlace": {
              "@type": "AdministrativeArea",
              "name": "Alberta"
            }
          },
          {
            "@type": "City",
            "name": "Airdrie",
            "containedInPlace": {
              "@type": "AdministrativeArea",
              "name": "Alberta"
            }
          },
          {
            "@type": "City",
            "name": "Cochrane",
            "containedInPlace": {
              "@type": "AdministrativeArea",
              "name": "Alberta"
            }
          },
          {
            "@type": "City",
            "name": "Chestermere",
            "containedInPlace": {
              "@type": "AdministrativeArea",
              "name": "Alberta"
            }
          }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Seasonal property and vacation-rental cleaning options",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Vacation-rental turnover cleaning"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Seasonal deep cleaning"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Snow removal"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Garden and yard cleanup"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Dust and debris removal"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Window cleaning and polishing"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Floor cleaning and treatment"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Exterior area cleaning"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Property preparation for rentals, sales and seasonal use"
              }
            }
          ]
        }
      }
    ]
  },
  "/calgary-cleaning-services/": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://camzcleaning.com/calgary-cleaning-services/#webpage",
        "url": "https://camzcleaning.com/calgary-cleaning-services/",
        "name": "Cleaning Services in Calgary for Homes & Businesses",
        "description": "Choose Camz Cleaning for residential and commercial cleaning in Calgary, with flexible scheduling and detailed service for homes and workplaces.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://camzcleaning.com/#website",
          "url": "https://camzcleaning.com/",
          "name": "Camz Cleaning"
        },
        "about": {
          "@type": "LocalBusiness",
          "@id": "https://camzcleaning.com/#business",
          "name": "Camz Cleaning",
          "url": "https://camzcleaning.com/"
        },
        "inLanguage": "en-CA",
        "mainEntity": {
          "@id": "https://camzcleaning.com/calgary-cleaning-services/#service"
        }
      },
      {
        "@type": "Service",
        "@id": "https://camzcleaning.com/calgary-cleaning-services/#service",
        "name": "Cleaning Services in Calgary for Homes & Businesses",
        "serviceType": "Cleaning services in Calgary",
        "description": "Choose Camz Cleaning for residential and commercial cleaning in Calgary, with flexible scheduling and detailed service for homes and workplaces.",
        "url": "https://camzcleaning.com/calgary-cleaning-services/",
        "provider": {
          "@type": "LocalBusiness",
          "@id": "https://camzcleaning.com/#business",
          "name": "Camz Cleaning",
          "url": "https://camzcleaning.com/",
          "telephone": "+1-587-837-1977",
          "email": "info@camzcleaning.com"
        },
        "areaServed": {
          "@type": "City",
          "name": "Calgary",
          "containedInPlace": {
            "@type": "AdministrativeArea",
            "name": "Alberta"
          }
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Cleaning services available in Calgary",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Residential cleaning"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Commercial cleaning"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Vehicle cleaning"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Seasonal property cleaning"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Move-in and move-out cleaning"
              }
            }
          ]
        }
      }
    ]
  },
  "/airdrie-cleaning-services/": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://camzcleaning.com/airdrie-cleaning-services/#webpage",
        "url": "https://camzcleaning.com/airdrie-cleaning-services/",
        "name": "Cleaning Services in Airdrie for Homes & Businesses",
        "description": "Book residential and commercial cleaning services in Airdrie with a dependable team serving homes, offices and local businesses.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://camzcleaning.com/#website",
          "url": "https://camzcleaning.com/",
          "name": "Camz Cleaning"
        },
        "about": {
          "@type": "LocalBusiness",
          "@id": "https://camzcleaning.com/#business",
          "name": "Camz Cleaning",
          "url": "https://camzcleaning.com/"
        },
        "inLanguage": "en-CA",
        "mainEntity": {
          "@id": "https://camzcleaning.com/airdrie-cleaning-services/#service"
        }
      },
      {
        "@type": "Service",
        "@id": "https://camzcleaning.com/airdrie-cleaning-services/#service",
        "name": "Cleaning Services in Airdrie for Homes & Businesses",
        "serviceType": "Cleaning services in Airdrie",
        "description": "Book residential and commercial cleaning services in Airdrie with a dependable team serving homes, offices and local businesses.",
        "url": "https://camzcleaning.com/airdrie-cleaning-services/",
        "provider": {
          "@type": "LocalBusiness",
          "@id": "https://camzcleaning.com/#business",
          "name": "Camz Cleaning",
          "url": "https://camzcleaning.com/",
          "telephone": "+1-587-837-1977",
          "email": "info@camzcleaning.com"
        },
        "areaServed": {
          "@type": "City",
          "name": "Airdrie",
          "containedInPlace": {
            "@type": "AdministrativeArea",
            "name": "Alberta"
          }
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Cleaning services available in Airdrie",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Residential cleaning"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Commercial cleaning"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Vehicle cleaning"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Seasonal property cleaning"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Move-in and move-out cleaning"
              }
            }
          ]
        }
      }
    ]
  },
  "/cochrane-cleaning-services/": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://camzcleaning.com/cochrane-cleaning-services/#webpage",
        "url": "https://camzcleaning.com/cochrane-cleaning-services/",
        "name": "Cleaning Services in Cochrane for Homes & Businesses",
        "description": "Get reliable residential and commercial cleaning in Cochrane with flexible scheduling and detailed service tailored to your property.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://camzcleaning.com/#website",
          "url": "https://camzcleaning.com/",
          "name": "Camz Cleaning"
        },
        "about": {
          "@type": "LocalBusiness",
          "@id": "https://camzcleaning.com/#business",
          "name": "Camz Cleaning",
          "url": "https://camzcleaning.com/"
        },
        "inLanguage": "en-CA",
        "mainEntity": {
          "@id": "https://camzcleaning.com/cochrane-cleaning-services/#service"
        }
      },
      {
        "@type": "Service",
        "@id": "https://camzcleaning.com/cochrane-cleaning-services/#service",
        "name": "Cleaning Services in Cochrane for Homes & Businesses",
        "serviceType": "Cleaning services in Cochrane",
        "description": "Get reliable residential and commercial cleaning in Cochrane with flexible scheduling and detailed service tailored to your property.",
        "url": "https://camzcleaning.com/cochrane-cleaning-services/",
        "provider": {
          "@type": "LocalBusiness",
          "@id": "https://camzcleaning.com/#business",
          "name": "Camz Cleaning",
          "url": "https://camzcleaning.com/",
          "telephone": "+1-587-837-1977",
          "email": "info@camzcleaning.com"
        },
        "areaServed": {
          "@type": "City",
          "name": "Cochrane",
          "containedInPlace": {
            "@type": "AdministrativeArea",
            "name": "Alberta"
          }
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Cleaning services available in Cochrane",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Residential cleaning"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Commercial cleaning"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Vehicle cleaning"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Seasonal property cleaning"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Move-in and move-out cleaning"
              }
            }
          ]
        }
      }
    ]
  },
  "/chestermere-cleaning-services/": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://camzcleaning.com/chestermere-cleaning-services/#webpage",
        "url": "https://camzcleaning.com/chestermere-cleaning-services/",
        "name": "Cleaning Services in Chestermere for Home & Businesses",
        "description": "Book professional home and commercial cleaning in Chestermere with flexible service options and a dependable local cleaning team.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://camzcleaning.com/#website",
          "url": "https://camzcleaning.com/",
          "name": "Camz Cleaning"
        },
        "about": {
          "@type": "LocalBusiness",
          "@id": "https://camzcleaning.com/#business",
          "name": "Camz Cleaning",
          "url": "https://camzcleaning.com/"
        },
        "inLanguage": "en-CA",
        "mainEntity": {
          "@id": "https://camzcleaning.com/chestermere-cleaning-services/#service"
        }
      },
      {
        "@type": "Service",
        "@id": "https://camzcleaning.com/chestermere-cleaning-services/#service",
        "name": "Cleaning Services in Chestermere for Home & Businesses",
        "serviceType": "Cleaning services in Chestermere",
        "description": "Book professional home and commercial cleaning in Chestermere with flexible service options and a dependable local cleaning team.",
        "url": "https://camzcleaning.com/chestermere-cleaning-services/",
        "provider": {
          "@type": "LocalBusiness",
          "@id": "https://camzcleaning.com/#business",
          "name": "Camz Cleaning",
          "url": "https://camzcleaning.com/",
          "telephone": "+1-587-837-1977",
          "email": "info@camzcleaning.com"
        },
        "areaServed": {
          "@type": "City",
          "name": "Chestermere",
          "containedInPlace": {
            "@type": "AdministrativeArea",
            "name": "Alberta"
          }
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Cleaning services available in Chestermere",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Residential cleaning"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Commercial cleaning"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Vehicle cleaning"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Seasonal property cleaning"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Move-in and move-out cleaning"
              }
            }
          ]
        }
      }
    ]
  },
  "/booking/": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://camzcleaning.com/booking/#webpage",
        "url": "https://camzcleaning.com/booking/",
        "name": "Book a Cleaning Service in Calgary | Camz Cleaning",
        "description": "Choose your cleaning service, preferred date and property details to request residential or commercial cleaning with Camz Cleaning.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://camzcleaning.com/#website",
          "url": "https://camzcleaning.com/",
          "name": "Camz Cleaning"
        },
        "about": {
          "@type": "LocalBusiness",
          "@id": "https://camzcleaning.com/#business",
          "name": "Camz Cleaning",
          "url": "https://camzcleaning.com/"
        },
        "inLanguage": "en-CA"
      }
    ]
  },
  "/gallery/": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://camzcleaning.com/gallery/#webpage",
        "url": "https://camzcleaning.com/gallery/",
        "name": "Cleaning Project Gallery | Camz Cleaning",
        "description": "View residential, commercial, vehicle and seasonal cleaning projects completed by Camz Cleaning across Calgary and nearby communities.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://camzcleaning.com/#website",
          "url": "https://camzcleaning.com/",
          "name": "Camz Cleaning"
        },
        "about": {
          "@type": "LocalBusiness",
          "@id": "https://camzcleaning.com/#business",
          "name": "Camz Cleaning",
          "url": "https://camzcleaning.com/"
        },
        "inLanguage": "en-CA",
        "mainEntity": {
          "@id": "https://camzcleaning.com/gallery/#gallery"
        }
      },
      {
        "@type": "ImageGallery",
        "@id": "https://camzcleaning.com/gallery/#gallery",
        "name": "Cleaning Project Gallery | Camz Cleaning",
        "description": "View residential, commercial, vehicle and seasonal cleaning projects completed by Camz Cleaning across Calgary and nearby communities.",
        "url": "https://camzcleaning.com/gallery/",
        "about": {
          "@type": "LocalBusiness",
          "@id": "https://camzcleaning.com/#business",
          "name": "Camz Cleaning",
          "url": "https://camzcleaning.com/"
        },
        "inLanguage": "en-CA"
      }
    ]
  },
  "/blogs/": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://camzcleaning.com/blogs/#webpage",
        "url": "https://camzcleaning.com/blogs/",
        "name": "Cleaning Tips & Guides | Camz Cleaning Blog",
        "description": "Read practical cleaning tips, checklists and service guides for homeowners, renters and businesses in Calgary and nearby communities.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://camzcleaning.com/#website",
          "url": "https://camzcleaning.com/",
          "name": "Camz Cleaning"
        },
        "about": {
          "@type": "LocalBusiness",
          "@id": "https://camzcleaning.com/#business",
          "name": "Camz Cleaning",
          "url": "https://camzcleaning.com/"
        },
        "inLanguage": "en-CA",
        "mainEntity": {
          "@id": "https://camzcleaning.com/blogs/#blog"
        }
      },
      {
        "@type": "Blog",
        "@id": "https://camzcleaning.com/blogs/#blog",
        "name": "Cleaning Tips & Guides | Camz Cleaning Blog",
        "description": "Read practical cleaning tips, checklists and service guides for homeowners, renters and businesses in Calgary and nearby communities.",
        "url": "https://camzcleaning.com/blogs/",
        "publisher": {
          "@type": "LocalBusiness",
          "@id": "https://camzcleaning.com/#business",
          "name": "Camz Cleaning",
          "url": "https://camzcleaning.com/"
        },
        "inLanguage": "en-CA"
      }
    ]
  },
  "/custom-cleaning-request/": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://camzcleaning.com/custom-cleaning-request/#webpage",
        "url": "https://camzcleaning.com/custom-cleaning-request/",
        "name": "Custom Cleaning Request | Camz Cleaning",
        "description": "Build a room-by-room cleaning checklist and request a custom quote from Camz Cleaning.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://camzcleaning.com/#website",
          "url": "https://camzcleaning.com/",
          "name": "Camz Cleaning"
        },
        "about": {
          "@type": "LocalBusiness",
          "@id": "https://camzcleaning.com/#business",
          "name": "Camz Cleaning",
          "url": "https://camzcleaning.com/"
        },
        "inLanguage": "en-CA",
        "mainEntity": {
          "@id": "https://camzcleaning.com/custom-cleaning-request/#service"
        }
      },
      {
        "@type": "Service",
        "@id": "https://camzcleaning.com/custom-cleaning-request/#service",
        "name": "Custom Cleaning Request",
        "serviceType": "Custom cleaning services",
        "description": "Build a room-by-room cleaning checklist and request a custom quote from Camz Cleaning.",
        "url": "https://camzcleaning.com/custom-cleaning-request/",
        "provider": {
          "@type": "LocalBusiness",
          "@id": "https://camzcleaning.com/#business",
          "name": "Camz Cleaning",
          "url": "https://camzcleaning.com/",
          "telephone": "+1-587-837-1977",
          "email": "info@camzcleaning.com"
        },
        "areaServed": [
          {
            "@type": "City",
            "name": "Calgary",
            "containedInPlace": {
              "@type": "AdministrativeArea",
              "name": "Alberta"
            }
          },
          {
            "@type": "City",
            "name": "Airdrie",
            "containedInPlace": {
              "@type": "AdministrativeArea",
              "name": "Alberta"
            }
          },
          {
            "@type": "City",
            "name": "Cochrane",
            "containedInPlace": {
              "@type": "AdministrativeArea",
              "name": "Alberta"
            }
          },
          {
            "@type": "City",
            "name": "Chestermere",
            "containedInPlace": {
              "@type": "AdministrativeArea",
              "name": "Alberta"
            }
          }
        ]
      }
    ]
  },
  "/contact-us/": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": "https://camzcleaning.com/contact-us/#webpage",
        "url": "https://camzcleaning.com/contact-us/",
        "name": "Contact Camz Cleaning | Calgary Cleaning Services",
        "description": "Contact Camz Cleaning for residential, commercial, vehicle or seasonal cleaning in Calgary and surrounding communities. Call or send a request.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://camzcleaning.com/#website",
          "url": "https://camzcleaning.com/",
          "name": "Camz Cleaning"
        },
        "about": {
          "@type": "LocalBusiness",
          "@id": "https://camzcleaning.com/#business",
          "name": "Camz Cleaning",
          "url": "https://camzcleaning.com/"
        },
        "inLanguage": "en-CA",
        "mainEntity": {
          "@type": "LocalBusiness",
          "@id": "https://camzcleaning.com/#business",
          "name": "Camz Cleaning",
          "url": "https://camzcleaning.com/",
          "telephone": "+1-587-837-1977",
          "email": "info@camzcleaning.com",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-587-837-1977",
            "email": "info@camzcleaning.com",
            "contactType": "customer service",
            "areaServed": "CA",
            "availableLanguage": [
              "English"
            ]
          }
        }
      }
    ]
  },
  "/privacy-policy/": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://camzcleaning.com/privacy-policy/#webpage",
        "url": "https://camzcleaning.com/privacy-policy/",
        "name": "Privacy Policy | Camz Cleaning",
        "description": "Read the Camz Cleaning privacy policy for website visitors, service requests, bookings and customer information handling.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://camzcleaning.com/#website",
          "url": "https://camzcleaning.com/",
          "name": "Camz Cleaning"
        },
        "about": {
          "@type": "LocalBusiness",
          "@id": "https://camzcleaning.com/#business",
          "name": "Camz Cleaning",
          "url": "https://camzcleaning.com/"
        },
        "inLanguage": "en-CA",
        "dateModified": "2026-06-19"
      }
    ]
  }
} as const;

type BlogPostingJsonLdInput = {
  id: string;
  title: string;
  description: string;
  image: string;
  publishedAt: string;
};

export function blogPostingJsonLd({
  id,
  title,
  description,
  image,
  publishedAt,
}: BlogPostingJsonLdInput) {
  const url = `https://camzcleaning.com/blogs/${id}/`;
  const imageUrl = image
    ? /^https?:\/\//i.test(image)
      ? image
      : `https://camzcleaning.com${image.startsWith("/") ? "" : "/"}${image}`
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#blogposting`,
    headline: title,
    description,
    ...(imageUrl ? { image: imageUrl } : {}),
    datePublished: publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
    },
    author: {
      "@type": "Organization",
      name: "Camz Cleaning",
      url: "https://camzcleaning.com/",
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://camzcleaning.com/#business",
      name: "Camz Cleaning",
      url: "https://camzcleaning.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://camzcleaning.com/wp-admin/uploads/footer-logo.webp",
      },
    },
    inLanguage: "en-CA",
  };
}

export type JsonLdPath = keyof typeof jsonLdSchemas;
