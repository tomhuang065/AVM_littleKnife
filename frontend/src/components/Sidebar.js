import React, { useState, useEffect } from "react";
import SimpleBar from 'simplebar-react';
import { useLocation } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBoxOpen, faChartPie, faCog, faHandHoldingUsd, faSignOutAlt, faTable, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Nav, Badge, Image, Button, Dropdown, Accordion, Navbar } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { useChat } from "../api/context";
import { Routes } from "../routes";
import ReactHero from "../assets/img/technologies/react-hero-logo.svg";

export default (props = {}) => {
  const location = useLocation();
  const { pathname } = location;
  // const {val, setVal, sendValue, signIn, suppliers} = useChat();


  // const onSendValue = async () => {
  //   // console.log(value)
  //   // if(!value){
  //   //     throw console.error("Some field missing");
  //   // }
  //   console.log("onsendvalue_wwwwww")
  //   const payload = {
  //       val : "from sidebar",  
  //   }
  //   // signIn(payload);
  //   sendValue(payload);
  //   console.log(payload)

  // }
  // useEffect(() => {
  //   onSendValue()
  // }, [location]);
  const CollapsableNavItem = (props) => {
    const { eventKey, title, icon, children = null } = props;
    const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";
    return (
      <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Button as={Nav.Link} className="d-flex justify-content-between align-items-center">
            <span>
              <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /></span>
              <span className="sidebar-text">{title}</span>
            </span>
          </Accordion.Button>
          <Accordion.Body className="multi-level">
            <Nav className="flex-column">
              {children}
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  const NavItem = (props) => {
    const { title, link, external, target, icon, image, badgeText, badgeBg = "secondary", badgeColor = "primary" } = props;
    const classNames = badgeText ? "d-flex justify-content-start align-items-center justify-content-between" : ""; //add a small icon like pro to an element of sidebar
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} >
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span> : null}
            {image ? <Image src={image} width={20} height={20} className="sidebar-icon svg-icon" /> : null}

            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge pill bg={badgeBg} text={badgeColor} className="badge-md notification-count ms-2">{badgeText}</Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <>
      <CSSTransition timeout={300}  classNames="sidebar-transition">
        <SimpleBar className={`collapse show sidebar d-md-block bg-primary text-white`}>
          {/* px : distance to the left, pt : distance to the top */}
          <div className="sidebar-inner px-4 pt-3"> 
            <Nav className="flex-column pt-3 pt-md-0">
              <NavItem title="智慧小刀" link={Routes.Presentation.path} image={ReactHero} />
              <NavItem title="首頁" link={Routes.DashboardOverview.path} icon={faChartPie} />
              <CollapsableNavItem eventKey="examples/" title="設定" icon={faCog}>
                <CollapsableNavItem eventKey="examples/" title="財會系統資料庫">
                  <NavItem title="會計科目設定" link={Routes.Accountingsettings.path} />
                  <NavItem title="價值標的設定" link={Routes.Valuetargets.path} />
                </CollapsableNavItem>
                <CollapsableNavItem eventKey="examples/" title="進銷存資料庫">
                  <NavItem title="BOM 設定" link={Routes.Bomsettings.path} />
                  <NavItem title="單位轉換表(pending)" link={Routes.Settings.path} />
                  <NavItem title="原物料期初庫存設定" link={Routes.BeginningInventorysettings.path} />
                </CollapsableNavItem>
                <NavItem title="供應商基本資料設定" link={Routes.Supplierssettings.path}  />
                <NavItem title="權限設定" link={Routes.Settings.path} />
              </CollapsableNavItem>            
              <NavItem title="Pos系統" icon={faHandHoldingUsd} link={Routes.Posystem.path} />
              <NavItem title="財會系統" icon={faHandHoldingUsd} link={Routes.Transactions.path} />

              <CollapsableNavItem eventKey="tables/" title="管理報表" icon={faTable}>
                <NavItem title="財會系統：損益表" link={Routes.BootstrapTables.path} />
                <NavItem title="進銷存管理報表" link={Routes.BootstrapTables.path} />
              </CollapsableNavItem>

              <Dropdown.Divider className="my-3 border-indigo" />


              
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};
